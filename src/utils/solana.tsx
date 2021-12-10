import React from 'react';
import { Input, Button, Switch, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, ModalFooter } from '@chakra-ui/react';

import {
  Text,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import * as web3 from '@solana/web3.js';
import * as splToken from '@solana/spl-token';

const connect = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));
const TOKEN_PROGRAM_ID = new web3.PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

export const BIP_TOKEN_ACCOUNT = 'FiSVrKiJ1sQiqrV6FejNxNPcKorn225kBthh7WCJZPi3';
export const USDC_TOKEN_ACCOUNT = 'DUcQr4jwUVmKLgYJnZk6sgVbnhjyiWwG71XxYX2KLvUX';
export const USDT_TOKEN_ACCOUNT = '4FLJicaijkqsrZdJMp89SBorwgaQLweLvLHaFCCzhstG';
export const DRUGS_TOKEN_ACCOUNT = '7uW58ttmZ67Mif53XHti4sL59ZPEVSWfgabGymFvfNXy';

export const BIP_MINT = 'FoqP7aTaibT5npFKYKQQdyonL99vkW8YALNPwWepdvf5';
export const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
export const USDT_MINT = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';
export const DRUGS_MINT = 'DcqWM1BdgfUFktSKw8XC6qLAo2Ki2dUFXc1YYe67c8kD';


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



export const renderButtons = (value: any, modal: any, bet, inputValue, setValue, isLoading, onOpen, noCustom) => {
  let mintAddress: string;
  let currency;
  let firstBetValue: {} | null | undefined;
  let secondBetValue: {} | null | undefined;
  let maxBetValue: number;
  let toTokenAccountAddress: string;

  switch(value) {
    case 'BIP':
      mintAddress = BIP_MINT;
      currency = 'BIP';
      firstBetValue = 200;
      secondBetValue = 1000;
      maxBetValue = 10000;
      toTokenAccountAddress = BIP_TOKEN_ACCOUNT;
      break;
    case 'USDC':
      mintAddress = USDC_MINT;
      currency = 'USDC';
      firstBetValue = 3;
      secondBetValue = 10;
      maxBetValue = 100;
      toTokenAccountAddress = USDC_TOKEN_ACCOUNT;
      break;
    case 'USDT':
      mintAddress = USDT_MINT;
      currency = 'USDT';
      firstBetValue = 3;
      secondBetValue = 10;
      maxBetValue = 100;
      toTokenAccountAddress = USDT_TOKEN_ACCOUNT;
      break;
    case 'DRUGS':
      mintAddress = DRUGS_MINT;
      currency = 'DRUGS';
      firstBetValue = 2000;
      secondBetValue = 10000;
      maxBetValue = 100000;
      toTokenAccountAddress = DRUGS_TOKEN_ACCOUNT;
      break;
    default:
      break;
  }


  if(modal) {
    return (
      <ModalContent>
        <ModalCloseButton color="#000" />
        <ModalBody paddingTop="60px">
          <Input width="100%" height="56px" placeholder={`value in $${currency} (max: ${maxBetValue})`} color="#000" type="number" value={inputValue} onChange={(e) => Number(e.target.value) <= maxBetValue && setValue(Number(e.target.value))} />
        </ModalBody>
        <ModalFooter>
          <Button isLoading={isLoading} loadingText={`Loading ${currency}$`} borderRadius="2rem" width="100%" height="56px" backgroundColor="#02011F" onClick={() => bet(inputValue, mintAddress, toTokenAccountAddress)}>
            <Text fontSize="14px" fontWeight="bold" color="#fff">Bet</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    )
  }


    return (
    <Row>
      <Button isLoading={isLoading} loadingText={`Loading ${currency}$`} borderRadius="2rem" width="180px" height="56px" onClick={() => bet(firstBetValue, mintAddress, toTokenAccountAddress)}>
        <Text fontSize="14px" fontWeight="bold" color="#000">{firstBetValue} ${currency}</Text>
      </Button>
      <Button isLoading={isLoading} loadingText={`Loading ${currency}$`} borderRadius="2rem" width="180px" height="56px" onClick={() => bet(secondBetValue, mintAddress, toTokenAccountAddress)}>
        <Text fontSize="14px" fontWeight="bold" color="#000">{secondBetValue} ${currency}</Text>
      </Button>
      {!noCustom && <Button isLoading={isLoading} loadingText={`Loading ${currency}$`} borderRadius="2rem" width="180px" height="56px" borderColor="#fff" borderWidth="1px" backgroundColor="#02011F" onClick={onOpen}>
        <Text fontSize="14px" fontWeight="bold" color="#fff">Custom ${currency} Value</Text>
      </Button>}
    </Row>
  )
}

export const sendCurrencyToTreasure = async ({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint }: any) => {

  let multiplier = 1000000;
  let currency = 'USDC'

  switch(mintAddress) {
    case BIP_MINT:
      multiplier = 1000000000;
      currency = 'BIP'
      break;
    case USDC_MINT:
      multiplier = 1000000;
      currency = 'USDC'
      break;
    case USDT_MINT:
      multiplier = 1000000;
      currency = 'USDT'
      break;
    case DRUGS_MINT:
      multiplier = 10000;
      currency = 'DRUGS'
      break;
    default:
      return;
  }

  const parsed = await connect.getParsedTokenAccountsByOwner(fromWallet.publicKey, { programId: TOKEN_PROGRAM_ID })

  const toTokenAccount = new web3.PublicKey(toTokenAccountAddress)
  var fromTokenAddress = null;

  for(let i = 0; i < parsed.value.length; i++) {
    if(parsed.value[i].account.data.parsed.info.mint === mintAddress) {
      fromTokenAddress = parsed.value[i].pubkey;
    }
  }


  if(!fromTokenAddress) {
    toast({
      title: `Error`,
      description: `No ${currency}`,
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
      betValue * multiplier,
    )
  );
  // Sign transaction, broadcast, and confirm
  const signature = await sendTransaction(transaction, connection);
  await connection.confirmTransaction(signature, 'confirmed');
  const r = await localStorage.getItem('r')

  const resp = await fetch(`https://bip-gamextwo.herokuapp.com/api/v1/transaction/${endpoint}`, {
  //const resp = await fetch(`http://localhost:3009/api/v1/transaction/${endpoint}`, {
    body: `{"transactionId":"${signature}", "betValue":"${betValue}", "currency":"${currency}", "r":"${r}"}`,
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  const parsedResult = await resp.json();

  return parsedResult;
}