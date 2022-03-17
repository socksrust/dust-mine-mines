import React, { useState, useContext, useEffect } from 'react';
import { Layout } from '../components/common/layout';
import { useDisclosure, RadioGroup, Stack, Radio } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import RPSComponent from '../components/rps/index'
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
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 100vh;
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

export default function RPS() {
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

        //@ts-ignore
        setPcOption(userWon[option])
        //isEven ? 2, 4, 6 : 1, 3, 5;
        const realResult = isEven ? 'HEADS' : 'TAILS';


        setTextContent(realResult);
        const winValue = betValue * 2;

        toast({
          title: `Yayyyy!!`,
          description: `You got $${(winValue).toFixed(2)} back! They will be transferred in less than a minute! Keep going!!`,
          status: 'info',
          duration: 15000,
          isClosable: true,
          position: 'bottom-right',
          variant: 'solid'
        });
      } else {
        const realResult = !isEven ? 'HEADS' : 'TAILS';
        //@ts-ignore
        setPcOption(userLost[option])
        //isEven ? 1, 3, 5 : 2, 4, 6 ;
        setTextContent(realResult);
        toast({
          title: `Ops.`,
          description: 'Not your lucky play, try again',
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
    const parsedResult = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'coinBet', publicKey, bets })
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
    <Layout>
      <Wrapper>
        <InnerWrapper>
          <motion.div
            style={{display: 'flex', flex: 3, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingRight: 20}}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
          >
            <Text fontSize="48px" lineHeight={1} fontWeight="bold" color={objectText}>Need <span style={{ color: accentColor }}>$SOL</span> for next mint?</Text>
            <Text fontSize="48px" fontWeight="normal" color={objectText}>- Flip it</Text>
            <Space height={20} />
            <Text fontSize="20px" fontWeight="normal" color={objectText}>Sometimes to acheive $TREATS dominance, you gotta risk it all. Play Responsibl</Text>
          </motion.div>
          <Space height={20} />
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
            style={{flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: secondaryBackground, padding: 20, borderRadius: 4}}
          >
              <RPSComponent option={option} pcOption={pcOption} isLoading={isLoading} textContent={textContent} diceValue={diceValue} />
              <Space height={50} />
              <RadioGroup onChange={setOption} value={option}>
                <Stack direction='row'>
                  <Radio value='Rock'>🪨 Rock</Radio>
                  <Radio value='Paper'>📝 Paper</Radio>
                  <Radio value='Scissors'>✂️ Scissors</Radio>
                </Stack>
              </RadioGroup>
              <Space height={20} />
              {renderButtons(context.value, false, bet, inputValue, setValue, isLoading, onOpen)}
            </motion.div>
          </InnerWrapper>
      </Wrapper>
    </Layout>
  );
}
