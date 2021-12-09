import React, { useState } from 'react';
import { Layout } from '../components/common/layout';
import { Input, Button, Switch, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, ModalFooter } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import * as splToken from '@solana/spl-token';
import LiveBets from '../components/live-bets/index'

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
  background-color: black;
  flex: 1;
`


const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 40px;
  padding-right: 90px;
`

const RowCentered = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 50px 0px;
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
  const [rotate, setRotate] = useState("");
  const [diceValue, setDiceValue] = useState(0); // integer state

  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

  if (typeof window === 'undefined') return <></>;

  const bet = async (betValue: number) => {
    if (betValue !== 100) {
      toast({
        title: `Error`,
        description: 'You must bet $100',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        variant: 'solid'
      });
      return;
    }

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

    const parsed = await connect.getParsedTokenAccountsByOwner(fromWallet.publicKey, { programId: TOKEN_PROGRAM_ID })

    const toTokenAccount = new web3.PublicKey('FiSVrKiJ1sQiqrV6FejNxNPcKorn225kBthh7WCJZPi3')
    var fromTokenAddress = null;

    for(let i = 0; i < parsed.value.length; i++) {
      if(parsed.value[i].account.data.parsed.info.mint === BIP_MINT) {
        fromTokenAddress = parsed.value[i].pubkey;
      }
    }

    if(!fromTokenAddress) {
      toast({
        title: `Error`,
        description: 'No BIP',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        variant: 'solid'
      });
      return null;
    }

    // Add token transfer instructions to transaction
    const transaction = new web3.Transaction().add(
      splToken.Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        fromTokenAddress,
        toTokenAccount,
        fromWallet.publicKey,
        [],
        betValue * 1000000000
      )
    );
    // Sign transaction, broadcast, and confirm
    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'confirmed');

    const resp = await fetch("https://bip-gamextwo.herokuapp.com/api/v1/transaction/jackpotBet", {
    //const resp = await fetch("http://localhost:3009/api/v1/transaction/jackpotBet", {
      body: `{"transactionId":"${signature}", "betValue":"${betValue}"}`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });

    const parsedResult = await resp.json();

    console.log('SIGNATURE', signature);
    console.log('parsedResult', parsedResult);

    console.log('SUCCESS');

    setLoading(false);

    if(parsedResult?.data?.won) {
      document.getElementById('won')?.click()

      const winValue = betValue * 100;

      setTimeout(() => {
        toast({
          title: `JACKPOT!!`,
          description: `You got ${(winValue).toFixed(2)} $BIP back! They will be transferred in less than a minute! Keep going!!`,
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
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
          >
        <Text fontSize="48px" fontWeight="600" color="#ABFC4F">
          <span style={{ fontSize: '24px', color: '#fff'}}>
          Jackpot: 
          </span>{`   `}10,000 $BIP
        </Text>
        <Text fontSize="12px" fontWeight="400">
        <span style={{ fontSize: '18px', color: '#fff', fontWeight: 600, paddingRight: 7}}>
          1%
          </span>{` `}
          Chance of winning
        </Text>
        </motion.div>
        <InnerWrapper>
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
          >
            <SlotComponent />
          </motion.div>
          <motion.div
            style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
          <RowCentered>
            <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="1" width="180px" height="56px" onClick={() => bet(100)}>
              <Text fontSize="14px" fontWeight="bold" color="#000">100 $BIP</Text>
            </Button>
          </RowCentered>
          </motion.div>

        </InnerWrapper>
      </Wrapper>
    </Layout>
  );
}
