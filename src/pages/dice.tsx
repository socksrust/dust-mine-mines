import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '../components/common/layout';
import GameItem from '../components/home/game-item';
import { Button, Switch, Image } from '@chakra-ui/react';

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
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-right: 90px;
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
`



export default function Dice() {
  const [isEven, setEven] = useState(false)
  if (typeof window === 'undefined') return <></>;

  return (
    <Layout>
      <Wrapper>
        <Text fontSize="24px" fontWeight="500">Hi player,</Text>
        <Text fontSize="48px" fontWeight="600">Play Dice  🎲</Text>
        <InnerWrapper>
          <Image
              src="/images/dice-banner.png"
              maxW="450px"
            />
          <RowCentered>
            <Text fontSize="48px" fontWeight="bold" color={!isEven ? '#ABFC4F' : '#fff'}>Odd</Text>
            <Switch size="lg" isChecked={isEven} value={isEven ? 'isEven' : 'isOdd'} onChange={(e) => setEven(e.target.value !== 'isEven')} />
            <Text fontSize="48px" fontWeight="bold" color={isEven ? '#ABFC4F' : '#fff'}>Even</Text>
          </RowCentered>
          <Row>
            <Button borderRadius="1" width="180px" height="56px">
              <Text fontSize="14px" fontWeight="bold" color="#000">60 $BIP</Text>
            </Button>
            <Button borderRadius="1" width="180px" height="56px">
              <Text fontSize="14px" fontWeight="bold" color="#000">180 $BIP</Text>
            </Button>
            <Button borderRadius="1" width="180px" height="56px" borderColor="#fff" borderWidth="1px" backgroundColor="#000">
              <Text fontSize="14px" fontWeight="bold" color="#fff">Custom $BIP Value</Text>
            </Button>
          </Row>
        </InnerWrapper>
      </Wrapper>
    </Layout>
  );
}
