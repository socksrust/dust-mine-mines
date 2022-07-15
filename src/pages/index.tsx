import React, { useState, useContext, useEffect } from "react";
import { Layout } from "../components/common/layout";
import {
  Switch,
  Modal,
  ModalOverlay,
  useDisclosure,
  Checkbox,
  Button,
  Tabs,
  TabList,
  Tab,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  useAnchorWallet,
  useWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import CoinComponent from "../components/coin/index";
import { CurrencyContext } from "./_app";
import { sendCurrencyToTreasure, renderButtons } from "../utils/solana";
import Space from "../components/common/space";
import LiveBets from "../components/live-bets/index";
import { Text, useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import constants from "../utils/constants";
import { url } from "inspector";
import axios from "axios";
import { sendBetToBalance } from "../utils/sendBetToBalance";

const { colors, infos } = constants;
const { objectBackground, secondaryBackground, accentColor, objectText } =
  colors;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  flex: 1;
  height: 100%;
`;

const Wr = styled.div`
  -webkit-transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  box-shadow: 0 0 10rem rgba(0, 0, 0, 0.2) inset;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 70px;
  @media (max-width: 1250px) {
    height: 100%;
    flex-direction: column;
    padding-bottom: 40px;
    width: 100%;
  }
`;

const RowCentered = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  width: 200px;
  border: 4px solid #0d1624;

  border-radius: 50px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 280px;
  padding-top: 10px;
`;

const breeding = keyframes`
  0% {
    width: 35px;
    height: 35px;
  }

  50% {
    width: 45px;
    height: 45px;
  }

  100% {
    width: 35px;
    height: 35px;
  }

`;

const BalanceArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 18px;

  span {
    font-size: 20px;
    font-weight: bold;
  }
`;

const LoadingBall = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 100%;

  ${(p) =>
    p.isFilled
      ? `
    background: #00E676;
  `
      : `
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.7);
  `}
`;

export default function Coin() {
  const [isEven, setEven] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isFlipping, setFlipping] = useState(false);
  const [isFlipped, setFlipped] = useState(false);
  const [inputValue, setValue] = useState();
  const [bets, setBets] = useState(0);
  const [isChecked, setChecked] = useState(false);
  const [textContent, setTextContent] = useState("HEADS");
  const [diceValue, setDiceValue] = useState(0); // integer state
  const context = useContext(CurrencyContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { connection } = useConnection();

  const { sendTransaction, publicKey, connected, signMessage } = useWallet();
  const [solBalance, setSolBalance] = useState(0);
  const [flyBalance, setFlyBalance] = useState(0);

  useEffect(() => {
    if (connected) {
      updateBalances();
    }
  }, [connected]);

  function updateBalances() {
    const body = {
      project: infos.project,
      wallet: publicKey?.toString(),
    };

    axios.post(`${infos.serverUrl}/balance`, body).then(({ data }) => {
      data.forEach(({ amount, tokenMint }) => {
        if (tokenMint === "11111111111111111111111111111111") {
          setSolBalance(amount);
        } else {
          // setFlyBalance(amount)
        }
      });
    });
  }

  const flip = ({ parsedResult, betValue }: any) => {
    setTextContent("");
    setFlipping(true);
    setTimeout(() => {
      setFlipping(false);
      setDiceValue(diceValue + 1);
      if (parsedResult?.won) {
        //isEven ? 2, 4, 6 : 1, 3, 5;
        const realResult = isEven ? "HEADS" : "TAILS";

        setFlipped(true);
        setTextContent(realResult);
        const winValue = betValue * 2;

        toast({
          title: `Yayyyy!!`,
          description: `You got $${winValue.toFixed(
            2
          )} $Tokens back! They will be transferred in less than a minute! Keep going!!`,
          status: "info",
          duration: 15000,
          isClosable: true,
          position: "bottom-right",
          variant: "solid",
        });
        updateBalances();
      } else {
        const realResult = !isEven ? "HEADS" : "TAILS";

        //isEven ? 1, 3, 5 : 2, 4, 6 ;
        setFlipped(true);
        setTextContent(realResult);
        toast({
          title: `Ops.`,
          description: "Not your lucky play, try again",
          status: "warning",
          duration: 15000,
          isClosable: true,
          position: "bottom-right",
          variant: "solid",
        });
        updateBalances();
      }
    }, 1000);
  };

  if (typeof window === "undefined") return <></>;

  const bet = async (
    betValue: number,
    mintAddress: string,
    toTokenAccountAddress: string
  ) => {
    if (!fromWallet) {
      toast({
        title: `Error`,
        description: "You must connect your wallet before",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        variant: "solid",
      });
      return;
    }
    setFlipped(false);

    //forceUpdate
    setDiceValue(diceValue + 1);
    setLoading(true);

    //START
    // const { parsedResult } = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'coinBet', publicKey, bets })
    const { parsedResult } = await sendBetToBalance(betValue, mintAddress, {
      publicKey,
      connected,
      signMessage,
    });
    //END

    setBets(bets >= 4 ? 0 : bets + 1);
    setLoading(false);
    onClose();
    flip({ parsedResult, betValue });

    if (isChecked) {
      await bet(betValue, mintAddress, toTokenAccountAddress);
    }
  };

  useEffect(() => {
    async function fetchStatus() {
      const resp = await fetch(`${infos.serverUrl}/api/v1/transaction/bets`, {
        body: `{"publicKeyString":"${publicKey?.toString()}"}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const parsedResponse = await resp.json();
      console.log("parsedResponse", parsedResponse.data);
      setBets(parsedResponse.data);
    }

    if (publicKey?.toString()) {
      fetchStatus();
    }
  }, [publicKey && publicKey?.toString()]);

  return (
    <Layout
      style={{
        background: "#121E30",
        // background: 'linear-gradient(0deg, rgba(141,0,233,1) 0%, rgba(255,0,110,1) 100%)'
      }}
    >
      <Wrapper>
        {connected && (
          <BalanceArea>
            <span>$SOL: {solBalance.toFixed(2)}</span>
            {/* <span>$TBF: {flyBalance.toFixed(2)}</span> */}
          </BalanceArea>
        )}
        <InnerWrapper>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
            style={{
              width: "fit-content",
              maxWidth: window.innerWidth <= 400 ? "360px" : "1000px",
              zIndex: "11",
            }}
          >
            <Wr
              style={{
                border: "2px solid rgba(13, 22, 36, 1)",
                display: "flex",
                flexDirection: "column",
                zIndex: "11",
                justifyContent: "center",
                position: "relative",
                alignItems: "center",
                backgroundColor: "rgba(17, 28, 46, 1)",
                // backgroundColor: 'red',
                borderRadius: "50%",
                width: "350px",
                height: "350px",
              }}
            >
              <CoinComponent
                isFlipped={isFlipped}
                isFlipping={isFlipping || isLoading}
                textContent={textContent}
                diceValue={diceValue}
              />

              {/* <RowCentered>
                <Text fontSize="36px" fontWeight="bold" color={!isEven ? objectBackground : 'rgba(255, 255, 255, 0.5)'}>TAILS</Text>
                <Switch size="lg" isChecked={isEven} value={isEven ? 'isEven' : 'isOdd'} onChange={(e) => setEven(e.target.value !== 'isEven')} />
                <Text fontSize="36px" fontWeight="bold" color={isEven ? objectBackground : 'rgba(255, 255, 255, 0.5)'}>HEADS</Text>

              </RowCentered> */}
            </Wr>
            <Box position="absolute" left="-150px" zIndex="1" top="75px">
              {renderButtons(
                context.value,
                false,
                bet,
                inputValue,
                setValue,
                isLoading,
                onOpen
              )}
            </Box>
          </motion.div>
          {/* <Space height={70} /> */}
          {/* <LiveBets /> */}
        </InnerWrapper>
        <Tabs variant="soft-rounded" m="2rem auto" border="3px solid #0d1624" p="0.15rem 0.25rem" borderRadius="58px">
          <TabList>
            <Tab
              fontSize="20px"
              fontWeight="bold"
              color={!isEven ? "#fff" : "rgba(255,0,110,1)"}
              bg={isEven ? "#fff" : "rgba(255,0,110,1)"}
            >
              TAILS
            </Tab>
            <Tab
              fontSize="20px"
              fontWeight="bold"
              marginLeft="4px"
              color={isEven ? "#000" : "#000"}
              bg={isEven ? "#fff" : "rgba(255,0,110,1)"}
            >
              HEADS
            </Tab>
          </TabList>
        </Tabs>

        <Box border="3px solid rgba(13, 22, 36, 1)" p="1rem 5rem" borderRadius="50px" m="0 auto">
          <Text fontSize="30px" fontWeight="800">FLIP COIN</Text>
        </Box>
      </Wrapper>
    </Layout>
  );
}
