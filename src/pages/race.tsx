import React, { useState, useContext } from 'react';
import { Layout } from '../components/common/layout';
import { Switch, Modal, ModalOverlay, useDisclosure, Checkbox } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import DiceComponent from '../components/dice/index'
import {CurrencyContext} from './_app';
import { sendCurrencyToTreasure, renderRaceButtons } from '../utils/solana'
import CountDown from '../components/countdown'
import Space from '../components/common/space'
import LiveRaceBets from '../components/live-race-bets'
import RaceJackpot from '../components/race-jackpot'

import {
  Text,
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #02011F;
  flex: 1;
  height: 100%;
`


const InnerWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-right: 90px;
  height: 100%;
`

const RowCentered = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  padding: 30px 0px;
`


export default function Dice() {
  const [isLoading, setLoading] = useState(false)
  const [inputValue, setValue] = useState()
  const [isChecked, setChecked] = useState(false)
  const [rotate, setRotate] = useState("");
  const [diceValue, setDiceValue] = useState(0); // integer state
  const context = useContext(CurrencyContext)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { sendTransaction, publicKey } = useWallet();
  const { connection } = useConnection();

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

    setLoading(true);


    //START
    const parsedResult = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'raceBet', publicKey })
    //END

    console.log({parsedResult})

    setLoading(false);
    onClose();

    if(parsedResult?.data?.won) {

      toast({
        title: `Congrats`,
        description: `You placed your RACE order successfuly! Wait a few seconds for it to show up on the board!`,
        status: 'info',
        duration: 15000,
        isClosable: true,
        position: 'bottom-right',
        variant: 'solid'
      });
    } else {

      toast({
        title: `Ops.`,
        description: 'Error placing race order, contact support',
        status: 'warning',
        duration: 15000,
        isClosable: true,
        position: 'bottom-right',
        variant: 'solid'
      });

    }
    if(isChecked) {
      await bet(betValue, mintAddress, toTokenAccountAddress);
    }

  }




  return (
    <Layout>
      <Wrapper>
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
          >
        </motion.div>
        <InnerWrapper>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, delay: 1.2 }}
          >
            <RaceJackpot />
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, delay: 1.2 }}
          >
            <CountDown countDownDate={new Date("Dec 13, 2021 16:00:00")} />
          </motion.div>
          <Space height={25} />
          <motion.div
            style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
            {renderRaceButtons(context.value, false, bet, inputValue, setValue, isLoading, onOpen)}
          </motion.div>
          <Space height={25} />
          <motion.div
            style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
            <LiveRaceBets />
          </motion.div>
        </InnerWrapper>
      </Wrapper>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        {renderRaceButtons(context.value, true, bet, inputValue, setValue, isLoading, onOpen)}
      </Modal>
    </Layout>
  );
}
