import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '../components/common/layout';
import { useRouter } from 'next/router';
import LiveBets from '../components/live-bets/index'
import { Button } from '../components/button';
import Space from '../components/common/space';
import { motion } from "framer-motion";

import * as anchor from '@project-serum/anchor';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  Text,
} from '@chakra-ui/react';
import styled from '@emotion/styled'

const treasury = process.env.NEXT_PUBLIC_TREASURY_ADDRESS
  ? new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_TREASURY_ADDRESS!)
  : null;

const config = process.env.NEXT_PUBLIC_CANDY_MACHINE_CONFIG
  ? new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_CONFIG!)
  : null;

const candyMachineId = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID!)
  : null;

const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.NEXT_PUBLIC_CANDY_START_DATE!, 10);

const txTimeout = 30000;


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color:#02011F;
  flex: 1;
  justify-content: space-around;
  padding: 20px 10px;
  overflow: hidden;
  padding-top: 50px;
`


const LeftWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 20px;
  padding-right: 20px;
`

const RightWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: 20px;
  align-items: center;
`


const Image = styled.img`
  width: 600px;
  height: 400px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 2;
`


export default function Index() {
  const [see, setSee] = useState(true);
  const [holders, setHolders] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const { push } = useRouter();

  if (typeof window === 'undefined') return <></>;
  if (!see) return <></>;

  const scrollToSection = () => {
    window.scrollTo({
      top: (ref.current?.getBoundingClientRect().top || 0) - 200,
      behavior: 'smooth',
    });
  };


  return (
    <Layout>
      <Wrapper>
        <LeftWrapper>
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
          >
        <Text fontSize="55px" lineHeight="70px" fontWeight="medium">Solbets is the future of Solana gaming</Text>
        <Space height={30}/>
        <Text fontSize="16px" cursor="pointer" color="rgba(255, 255, 255, 0.6)">Solbets allow you to play a huge variety of games with $SOL, $USDC, $BIP and other Solana ecosystem coins</Text>
        <Space height={15}/>
        <Text fontSize="16px" cursor="pointer" color="rgba(255, 255, 255, 0.6)">We're 100% transparent and fair, click below to access our public data dashboard!</Text>
        <Space height={30}/>

        <Button width="180px" backgroundColor="#fff"  onClick={() => window.open('https://charts.mongodb.com/charts-casi-mhqkh/public/dashboards/61b0ccb6-87e0-45a6-85f5-7b6cd1945cf6', '_ blank')}>
          Visit data Dashboard
        </Button>
        </motion.div>

        </LeftWrapper>
        <RightWrapper>
          <LiveBets />
          <Image src="/images/waves.png" />
        </RightWrapper>
      </Wrapper>
    </Layout>
  );
}
