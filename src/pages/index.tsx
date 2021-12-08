import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '../components/common/layout';
import { useRouter } from 'next/router';
import LiveBets from '../components/live-bets/index'

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
  flex-direction: column;
  background-color: black;
  flex: 1;
  
`


const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 80px;
  padding-top: 100px;
  width: 90%;
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
        <Text fontSize="24px" fontWeight="500">Hi player,</Text>
        <Text fontSize="48px" fontWeight="600">Lets play? 🃏</Text>
        <Text fontSize="24" fontWeight="bold" cursor="pointer" color="#ABFC4F" onClick={() => window.open('https://app.thestarship.finance/', '_ blank')}>Buy $BIP</Text>
        <InnerWrapper>
          <LiveBets />
        </InnerWrapper>
      </Wrapper>
    </Layout>
  );
}
