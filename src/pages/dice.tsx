import React, { useState, useContext } from 'react';
import { Layout } from '../components/common/layout';
import { Input, Button, Switch, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, ModalFooter } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import * as splToken from '@solana/spl-token';
import DiceComponent from '../components/dice/index'
import {CurrencyContext} from './_app';

const BIP_TOKEN_ACCOUNT = 'FiSVrKiJ1sQiqrV6FejNxNPcKorn225kBthh7WCJZPi3';
const USDC_TOKEN_ACCOUNT = 'DUcQr4jwUVmKLgYJnZk6sgVbnhjyiWwG71XxYX2KLvUX';
const USDT_TOKEN_ACCOUNT = '4FLJicaijkqsrZdJMp89SBorwgaQLweLvLHaFCCzhstG';
const DRUGS_TOKEN_ACCOUNT = '7uW58ttmZ67Mif53XHti4sL59ZPEVSWfgabGymFvfNXy';

const BIP_MINT = 'FoqP7aTaibT5npFKYKQQdyonL99vkW8YALNPwWepdvf5';
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const USDT_MINT = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';
const DRUGS_MINT = 'DcqWM1BdgfUFktSKw8XC6qLAo2Ki2dUFXc1YYe67c8kD';

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



export default function Dice() {
  const [isEven, setEven] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [inputValue, setValue] = useState()
  const [rotate, setRotate] = useState("");
  const [diceValue, setDiceValue] = useState(0); // integer state
  const context = useContext(CurrencyContext)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

  if (typeof window === 'undefined') return <></>;

  const possibleResults = [
    "rotateX(" + 3600 + "deg) rotateY(" + 3600 + "deg)",
    "rotateX(" + 3780 + "deg) rotateY(" + 3960 + "deg)",
    "rotateX(" + 3960 + "deg) rotateY(" + 3870 + "deg)",
    "rotateX(" + 3960 + "deg) rotateY(" + 3690 + "deg)",
    "rotateX(" + 3870 + "deg) rotateY(" + 3780 + "deg)",
    "rotateX(" + 3690 + "deg) rotateY(" + 3690 + "deg)",
  ]

	const roll = () => {
		const xRand = 100000 * 90;
		const yRand = 100000 * 90;
		const rotate = "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)";
		setRotate(rotate);
	};

  const bet = async (betValue: number, mintAddress: string, toTokenAccountAddress: string) => {
    console.log({ betValue, mintAddress, toTokenAccountAddress})


    if (betValue > 10001) {
      toast({
        title: `Error`,
        description: 'You must set a value under 10001',
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

    //forceUpdate
    setDiceValue(diceValue + 1)


    roll();
    setLoading(true);

    const parsed = await connect.getParsedTokenAccountsByOwner(fromWallet.publicKey, { programId: TOKEN_PROGRAM_ID })

    const toTokenAccount = new web3.PublicKey(toTokenAccountAddress)
    var fromTokenAddress = null;

    for(let i = 0; i < parsed.value.length; i++) {
      if(parsed.value[i].account.data.parsed.info.mint === mintAddress) {
        console.log('pimba');
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

    console.log('betValue', betValue)
    console.log('betValue * multiplier', betValue * multiplier)

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

    const resp = await fetch("https://bip-gamextwo.herokuapp.com/api/v1/transaction/diceBet", {
    //const resp = await fetch("http://localhost:3009/api/v1/transaction/diceBet", {
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
    onClose();
    const evenValues = [2,4,6]
    const oddValues = [1,3,5]
    const dice = Math.floor(Math.random() * 3);

    if(parsedResult?.data?.won) {

      //isEven ? 2, 4, 6 : 1, 3, 5;
      const realResult = isEven ? evenValues[dice] : oddValues[dice];


      setRotate(possibleResults[realResult-1]);
      const winValue = betValue * 2;

      toast({
        title: `Yayyyy!!`,
        description: `You got ${(winValue).toFixed(2)} $${currency} back! They will be transferred in less than a minute! Keep going!!`,
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
        variant: 'solid'
      });
    } else {
      const realResult = !isEven ? evenValues[dice] : oddValues[dice];

      //isEven ? 1, 3, 5 : 2, 4, 6 ;
      setRotate(possibleResults[realResult-1]);
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

  const renderButtons = (value: any, modal) => {
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
        firstBetValue = 1;
        secondBetValue = 5;
        maxBetValue = 10;
        toTokenAccountAddress = USDC_TOKEN_ACCOUNT;
        break;
      case 'USDT':
        mintAddress = USDT_MINT;
        currency = 'USDT';
        firstBetValue = 1;
        secondBetValue = 5;
        maxBetValue = 10;
        toTokenAccountAddress = USDT_TOKEN_ACCOUNT;
        break;
      case 'DRUGS':
        mintAddress = DRUGS_MINT;
        currency = 'DRUGS';
        firstBetValue = 200;
        secondBetValue = 1000;
        maxBetValue = 10000;
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


      return (<Row>
        <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="2rem" width="180px" height="56px" onClick={() => bet(firstBetValue, mintAddress, toTokenAccountAddress)}>
          <Text fontSize="14px" fontWeight="bold" color="#000">{firstBetValue} ${currency}</Text>
        </Button>
        <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="2rem" width="180px" height="56px" onClick={() => bet(secondBetValue, mintAddress, toTokenAccountAddress)}>
          <Text fontSize="14px" fontWeight="bold" color="#000">{secondBetValue} ${currency}</Text>
        </Button>
        <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="2rem" width="180px" height="56px" borderColor="#fff" borderWidth="1px" backgroundColor="#02011F" onClick={onOpen}>
          <Text fontSize="14px" fontWeight="bold" color="#fff">Custom ${currency} Value</Text>
        </Button>
      </Row>
    )
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
            transition={{ duration: 0.55 }}
          >
            <DiceComponent isRolling={isLoading} rotate={rotate} diceValue={diceValue} />
          </motion.div>
          <motion.div
            style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
          <RowCentered>
            <Text fontSize="48px" fontWeight="bold" color={!isEven ? '#fff' : 'rgba(255,255,255, 0.6)'}>Odd</Text>
            <Switch size="lg" isChecked={isEven} value={isEven ? 'isEven' : 'isOdd'} onChange={(e) => setEven(e.target.value !== 'isEven')} />
            <Text fontSize="48px" fontWeight="bold" color={isEven ? '#fff' : 'rgba(255,255,255, 0.6)'}>Even</Text>
          </RowCentered>
          {renderButtons(context.value, false)}
          </motion.div>

        </InnerWrapper>
      </Wrapper>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        {renderButtons(context.value, true)}
      </Modal>
    </Layout>
  );
}
