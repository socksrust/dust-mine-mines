import React, { useState, useContext, useEffect } from "react";
import { Layout } from "../components/common/layout";
import {
  Switch,
  Modal,
  ModalOverlay,
  useDisclosure,
  Checkbox,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  useAnchorWallet,
  useWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import DiceComponent from "../components/dice/index";
import { CurrencyContext } from "./_app";
import { sendCurrencyToTreasure, renderButtons } from "../utils/solana";
import Space from "../components/common/space";
import constants from "../utils/constants";

const { colors, infos } = constants;
const { secondaryBackground, accentColor, objectText } = colors;

import { Text, useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import axios from "axios";
import { sendBetToBalance } from "../utils/sendBetToBalance";
import zIndex from "@material-ui/core/styles/zIndex";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  flex: 1;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* height: 75vh; */

  width: 100%;
  padding-top: 20px;
  max-width: 760px;
  @media (max-width: 1250px) {
    height: 100%;
    width: 100%;
    flex-direction: column;
    padding-bottom: 40px;
  }
`;

const RowCentered = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 246px;
  padding-top: 10px;
  @media (max-width: 1250px) {
    width: unset;
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

export default function Dice() {
  const [isEven, setEven] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [inputValue, setValue] = useState();
  const [isChecked, setChecked] = useState(false);
  const [rotate, setRotate] = useState("");
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

  if (typeof window === "undefined") return <></>;

  const possibleResults = [
    "rotateX(" + 3600 + "deg) rotateY(" + 3600 + "deg)",
    "rotateX(" + 3780 + "deg) rotateY(" + 3960 + "deg)",
    "rotateX(" + 3960 + "deg) rotateY(" + 3870 + "deg)",
    "rotateX(" + 3960 + "deg) rotateY(" + 3690 + "deg)",
    "rotateX(" + 3870 + "deg) rotateY(" + 3780 + "deg)",
    "rotateX(" + 3690 + "deg) rotateY(" + 3690 + "deg)",
  ];

  const roll = () => {
    const xRand = 100000 * 90;
    const yRand = 100000 * 90;
    const rotate = "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)";
    setRotate(rotate);
  };

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

    //forceUpdate
    setDiceValue(diceValue + 1);
    roll();
    setLoading(true);

    //START
    // const parsedResult = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'diceBet', publicKey })
    const { parsedResult } = await sendBetToBalance(betValue, mintAddress, {
      publicKey,
      connected,
      signMessage,
    });
    //END

    setLoading(false);
    onClose();
    const evenValues = [2, 4, 6];
    const oddValues = [1, 3, 5];
    const dice = Math.floor(Math.random() * 3);

    if (parsedResult?.won) {
      //isEven ? 2, 4, 6 : 1, 3, 5;
      const realResult = isEven ? evenValues[dice] : oddValues[dice];

      setRotate(possibleResults[realResult - 1]);
      const winValue = betValue * 2;

      toast({
        title: `Yayyyy!!`,
        description: `You got $${winValue.toFixed(
          2
        )} $SOL back! They will be transferred in less than a minute! Keep going!!`,
        status: "info",
        duration: 15000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });
      updateBalances();
    } else {
      const realResult = !isEven ? evenValues[dice] : oddValues[dice];

      //isEven ? 1, 3, 5 : 2, 4, 6 ;
      setRotate(possibleResults[realResult - 1]);
      toast({
        title: `Ops.`,
        description: `Not your lucky play, try again. You lost ${betValue} ${context.value}`,
        status: "warning",
        duration: 15000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });
      updateBalances();
    }
    if (isChecked) {
      await bet(betValue, mintAddress, toTokenAccountAddress);
    }
  };

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
            {/* <span>$HERD: {flyBalance.toFixed(2)}</span> */}
          </BalanceArea>
        )}
        <InnerWrapper>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
            style={{
              // overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#111C2E",
              border: "2px solid #0D1624",
              padding: "50px 90px",
              borderRadius: "38px",
              position: "relative",
              zIndex: "4",
            }}
          >
            <DiceComponent
              isRolling={isLoading}
              rotate={rotate}
              diceValue={diceValue}
            />
            <RowCentered />
            <RowCentered />
            
          </motion.div>
          <Box position="absolute" bottom="25px" left="0" zIndex="1">
              {renderButtons({
                value: context.value,
                modal: false,
                bet: bet,
                inputValue: inputValue,
                setValue: setValue,
                isLoading: isLoading,
                onOpen: onOpen,
                noCustom: false,
                direction: "column"
              })}
            </Box>
        </InnerWrapper>
        <RowCentered>
          <Text
            fontSize="36px"
            fontWeight="bold"
            color={!isEven ? "#fff" : "rgba(255,255,255, 0.6)"}
          >
            Odd
          </Text>
          <Space width={10} />
          <Switch
            size="lg"
            isChecked={isEven}
            value={isEven ? "isEven" : "isOdd"}
            onChange={(e) => setEven(e.target.value !== "isEven")}
          />
          <Space width={10} />
          <Text
            fontSize="36px"
            fontWeight="bold"
            color={isEven ? "#fff" : "rgba(255,255,255, 0.6)"}
          >
            Even
          </Text>
        </RowCentered>
        <RowCentered />
        <Box p="1rem 5rem" border="3px solid #0d1624" borderRadius="50px">
          <Text fontSize="30px" fontWeight="700" fontFamily="Work Sans">
            ROLL DICE
          </Text>
        </Box>
      </Wrapper>
    </Layout>
  );
}
