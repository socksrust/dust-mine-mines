import React, { useState, useContext } from 'react';
import { Layout } from '../components/common/layout';
import { Input, Button, Switch, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, ModalFooter } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import * as splToken from '@solana/spl-token';
import Space from '../components/common/space'
import {CurrencyContext} from './_app';
import { sendCurrencyToTreasure, renderButtons } from '../utils/solana'

//import SlotComponent from '../components/slot/index'
const SlotComponent = dynamic(
  () => import('../components/slot/index'),
  {
    ssr: false,
  }
);

import dynamic from 'next/dynamic';

const BIP_MINT = 'FoqP7aTaibT5npFKYKQQdyonL99vkW8YALNPwWepdvf5';
const MASTER_PK = 'B8e4g2SP7AC9SqQXPChEEmduhwBuZ8MTMb5xEGUchU2t';
const connect = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));
const TOKEN_PROGRAM_ID = new web3.PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

import {
  Text,
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled'
import { setTimeout } from 'timers';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #02011F;
  flex: 1;
`


const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-right: 90px;
`

const RowCentered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
  font-size: 40px;
  font-weight: bold;
  margin-right: -90px;
  text-align: left;
  color: rgba(80, 227, 194, 1);
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  @media (max-width: 1280px) {
    width: 100% !important;
  }
`



export default function Jackpot() {
  const [isLoading, setLoading] = useState(false)
  const context = useContext(CurrencyContext)


  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { sendTransaction } = useWallet();
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

    //roll();
    setLoading(true);

    const parsedResult = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'jackpotBet' })

    setLoading(false);

    if(parsedResult?.data?.won) {
      document.getElementById('won')?.click()

      const winValue = betValue * 50;

      setTimeout(() => {
        toast({
          title: `JACKPOT!!`,
          description: `You got ${(winValue).toFixed(2)} $ back! They will be transferred in less than a minute! Keep going!!`,
          status: 'info',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
          variant: 'solid'
        });
      }, 5000)

    } else {
      document.getElementById('lost')?.click()


      setTimeout(() => {
        toast({
          title: `Ops.`,
          description: 'Not your lucky play, try again',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
          variant: 'solid'
        });
      }, 5000)
    }
  }

  return (
    <Layout>
      <Wrapper>
        <InnerWrapper>
        <motion.div
            //style={{width: '100%', display: 'flex', flexDirection: 'row'/*, justifyContent: 'flex-start', alignItems: 'center'*/}}
            style={{ position: 'relative' }}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
          >
            <SlotComponent />
            <RowCentered>
              <Text style={{ fontSize: 60, marginRight: -28, }}>
                x50
              </Text>
            </RowCentered>
          </motion.div>
          <Space height={50} />
          <motion.div
            style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
          {renderButtons(context.value, false, bet, null, () => null, isLoading, null, true)}
          </motion.div>

        </InnerWrapper>
      </Wrapper>
    </Layout>
  );
}
