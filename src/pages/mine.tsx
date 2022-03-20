import React, { useState, useContext, useEffect } from 'react';
import { Layout } from '../components/common/layout';
import { useDisclosure, RadioGroup, Stack, Radio } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import Mine from '../components/mine/index'
import {CurrencyContext} from './_app';
import { sendCurrencyToTreasure, renderButtons } from '../utils/solana'
import Space from '../components/common/space'
import {
  Text,
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import constants from '../utils/constants';

const { colors, infos } = constants;
const { secondaryBackground, accentColor, objectText } = colors;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  padding-right: 90px;
`


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
  }
`

const userWon = {
		Rock: 'Scissors',
		Paper: 'Rock',
		Scissors: 'Paper'
}

const userLost = {
		Rock: 'Paper',
		Paper: 'Scissors',
		Scissors: 'Rock'
}

export default function Min() {
  const [isEven, setEven] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isFlipping, setFlipping] = useState(false)
  const [isFlipped, setFlipped] = useState(false)
  const [inputValue, setValue] = useState()
  const [bets, setBets] = useState(0)
  const [isChecked, setChecked] = useState(false)
  const [textContent, setTextContent] = useState("HEADS");
  const [diceValue, setDiceValue] = useState(0); // integer state
  const context = useContext(CurrencyContext)
  const [option, setOption] = useState('Rock')
  const [pcOption, setPcOption] = useState('Rock')
  const [isPaymentVerified, setVerified] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { sendTransaction, publicKey } = useWallet();
  const { connection } = useConnection();

  const flip = ({ parsedResult, betValue }: any) => {
    setTextContent('')
    setFlipping(true);
    setFlipped(!isFlipped);
    setTimeout(() => {
      setFlipping(false)
      if(parsedResult?.data?.won) {

        setVerified(true);
        toast({
          title: `Yayyyy!!`,
          description: `All good!! Start playing by clicking on the squares`,
          status: 'info',
          duration: 15000,
          isClosable: true,
          position: 'bottom-right',
          variant: 'solid'
        });
      } else {
        toast({
          title: `Ops.`,
          description: 'Sorry, we had an issue, reach out to support',
          status: 'warning',
          duration: 15000,
          isClosable: true,
          position: 'bottom-right',
          variant: 'solid'
        });

      }
    }, 1000);
  }

  if (typeof window === 'undefined') return <></>;


  const bet = async (betValue: number, mintAddress: string, toTokenAccountAddress: string) => {
    if(!fromWallet) {
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

    //forceUpdate
    setDiceValue(diceValue + 1)
    setLoading(true);


    //START
    const parsedResult = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'payMineBet', publicKey, bets })
    //END

    setLoading(false);
    onClose();
    flip({ parsedResult, betValue })

  }

  useEffect(() => {
    async function fetchStatus() {
      const resp = await fetch(`${infos.serverUrl}/api/v1/transaction/bets`, {
        body: `{"publicKeyString":"${publicKey?.toString()}"}`,
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      const parsedResponse = await resp.json();
      console.log('parsedResponse', parsedResponse.data);
      setBets(parsedResponse.data);
    }

    if(publicKey?.toString()) {
      fetchStatus();
    }

  }, [publicKey && publicKey?.toString()])

  return (
    <Layout style={{ backgroundImage: "url('/images/bg-1.jpg')" }}>
      <Wrapper>
        <InnerWrapper>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
            style={{flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: secondaryBackground, padding: 20, borderRadius: 4}}
          >
              <Mine isPaymentVerified={isPaymentVerified} />
              <Space height={50} />
              <Space height={20} />
              {renderButtons(context.value, false, bet, inputValue, setValue, isLoading, onOpen)}
            </motion.div>
          </InnerWrapper>
      </Wrapper>
    </Layout>
  );
}
