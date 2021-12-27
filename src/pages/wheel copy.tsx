import React, { useState } from 'react';
import { Layout } from '../components/common/layout';
import { Input, Button, Switch, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, ModalFooter } from '@chakra-ui/react';
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import * as splToken from '@solana/spl-token';

const BIP_MINT = 'FoqP7aTaibT5npFKYKQQdyonL99vkW8YALNPwWepdvf5';
const connect = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));
const TOKEN_PROGRAM_ID = new web3.PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

const Wheel = dynamic(
  () => import('../components/wheel/index'),
  {
    ssr: false,
  }
);

import {
  Text,
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #070B17;
  flex: 1;
  
`


const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-right: 90px;
  position: relative;
`

const RowCentered = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 346px;
  padding: 30px 0px;
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

var data = [
  { option: 'x0' },
  { option: 'x0.1' },
  { option: 'x0.2' },
  { option: 'x0.8' },
  { option: 'x2' },
  { option: 'x4' },
  { option: 'x6' },
  { option: 'x8' },
  { option: 'x10' },
]

var disctionaire = [
0, 0.1, 0.2, 0.8, 2, 4, 6, 8, 10
]

export default function WheelPage() {
  const [mustSpin, setMustSpin] = useState(false);
  const [betValue, setBetValue] = useState(0);

  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isLoading, setLoading] = useState(false)
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

  if (typeof window === 'undefined') return null;

  const finishSpinning = () => {
    setLoading(false);
  }

  const bet = async (betValue: number) => {
    setBetValue(betValue);


    if (betValue > 999) {
      toast({
        title: `Error`,
        description: 'You must set a value under 999',
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

    setLoading(true);
    setMustSpin(true)

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

    const resp = await fetch("http://localhost:3009/api/v1/transaction/wheelBet", {
    // const resp = await fetch("http://localhost:3009/api/v1/transaction/diceBet", {
      body: `{"transactionId":"${signature}"}`,
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });

    const parsedResult = await resp.json();

    setLoading(false);

    if(parsedResult?.data?.won) {
      const won = Number(parsedResult?.data?.won);
      const winValue = betValue * won;
      const prizeNumber = disctionaire.findIndex((a) => a===won)
      setPrizeNumber(prizeNumber)

      toast({
        title: `Yayyyy!!`,
        description: `You got ${(winValue).toFixed(2)} $BIP back! They will be transferred in less than a minute! Keep going!!`,
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
        variant: 'solid'
      });
    } else {
      toast({
        title: `Ops.`,
        description: 'Not your lucky play, try again',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
        variant: 'solid'
      });
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
        <Text fontSize="24px" fontWeight="500">Hi player,</Text>
        <Text fontSize="48px" fontWeight="600">Spin Wheel  🎡</Text>
        </motion.div>
        <InnerWrapper>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
          >
            <Wheel
              mustSpin={mustSpin}
              setMustSpin={setMustSpin}
              prizeNumber={prizeNumber}
              data={data}
              finishSpinning={finishSpinning}
            />
          </motion.div>
          <motion.div
            style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 30}}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
          <Row>
            <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="1" width="180px" height="56px" onClick={() => bet(10)}>
              <Text fontSize="14px" fontWeight="bold" color="#000">10 $BIP</Text>
            </Button>
            <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="1" width="180px" height="56px" onClick={() => bet(50)}>
              <Text fontSize="14px" fontWeight="bold" color="#000">50 $BIP</Text>
            </Button>
            <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="1" width="180px" height="56px" onClick={() => bet(100)}>
              <Text fontSize="14px" fontWeight="bold" color="#000">100 $BIP</Text>
            </Button>
          </Row>
          </motion.div>

        </InnerWrapper>
      </Wrapper>
    </Layout>
  );
}
