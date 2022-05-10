import React, { useState, useContext, useEffect } from 'react';
import { Layout } from '../components/common/layout';
import { useDisclosure } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import BlackjackComponent from '../components/blackjack/index'
import { CurrencyContext } from './_app';
import { sendCurrencyToTreasure, renderButtons } from '../utils/solana'
import Space from '../components/common/space'
import {
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled'
import constants from '../utils/constants';
import axios from 'axios';
import { sendBetToBalance } from '../utils/sendBetToBalance';

const { colors, infos } = constants;
const { secondaryBackground, accentColor, objectText } = colors;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  padding-top: 50px;
`


const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 10px;
  @media (max-width: 1250px) {
    height: 100%;
    flex-direction: column;
    padding-bottom: 40px;
  }
`

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

`

export default function Blackjack() {
  const [isLoading, setLoading] = useState(false)
  const [isFlipped, setFlipped] = useState(false)
  const [inputValue, setValue] = useState()
  const [bets, setBets] = useState(0)
  const [diceValue, setDiceValue] = useState(0); // integer state
  const context = useContext(CurrencyContext)
  const [mySignature, setSignature] = useState(null)
  const [isPaymentVerified, setVerified] = useState(false)
  const [won, setWon] = useState()

  const { onOpen } = useDisclosure()
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { connection } = useConnection();

  const { sendTransaction, publicKey, connected, signMessage } = useWallet();
  const [solBalance, setSolBalance] = useState(0)
  const [flyBalance, setFlyBalance] = useState(0)

  useEffect(() => {
    if (connected) {
      updateBalances()
    }
  }, [connected])


  function updateBalances() {
    const body = {
      project: infos.project,
      wallet: publicKey?.toString()
    }

    axios.post(`${infos.serverUrl}/balance`, body).then(({ data }) => {

      data.forEach(({ amount, tokenMint }) => {
        if (tokenMint === "11111111111111111111111111111111") {
          setSolBalance(amount)
        } else {
          // setFlyBalance(amount)
        }
      })
    })
  }

  const betCallback = ({ parsedResult, betValue }: any) => {
    setFlipped(!isFlipped);
    setVerified(true);
    toast({
      title: `Yayyyy!!`,
      description: `All good!! Start playing your blackjack game`,
      status: 'info',
      duration: 15000,
      isClosable: true,
      position: 'bottom-right',
      variant: 'solid'
    });

    setWon(parsedResult?.won)
  }

  if (typeof window === 'undefined') return <></>;


  const bet = async (betValue: number, mintAddress: string, toTokenAccountAddress: string) => {
    if (!fromWallet) {
      toast({
        title: `Error`,
        description: 'You must connect your wallet before',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        variant: 'solid'
      });
      return;
    }
    // @ts-ignore
    setVerified(false)


    //forceUpdate
    setDiceValue(diceValue + 1)
    setLoading(true);


    //START
    // const { parsedResult, signature} = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'payBlackjackBet', publicKey, bets })
    const { parsedResult } = await sendBetToBalance(betValue, mintAddress, { publicKey, connected, signMessage })
    //END
    // setSignature(signature);

    setLoading(false);
    betCallback({ parsedResult, betValue })

  }

  return (
    <Layout style={{ backgroundImage: "url('https://i.imgur.com/e5W6Pyn.png')", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <Wrapper>
        <InnerWrapper>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
            style={{ overflow: 'hidden', flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, .25)', padding: 20, borderRadius: 4 }}
          >
            {connected && (
              <BalanceArea>
                <span>$SOL: {solBalance.toFixed(2)}</span>
                {/* <span>$HERD: {flyBalance.toFixed(2)}</span> */}
              </BalanceArea>
            )}
            <BlackjackComponent isPaymentVerified={isPaymentVerified} setVerified={setVerified} won={won} />
            <Space height={50} />
            <Space height={20} />
            {renderButtons(context.value, false, bet, inputValue, setValue, isLoading, onOpen)}
          </motion.div>
        </InnerWrapper>
      </Wrapper>
    </Layout>
  );
}
