import React, { useState } from 'react';
import { Layout } from '../components/common/layout';
import { Input, Button, Switch, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, ModalFooter } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import * as splToken from '@solana/spl-token';
import DiceComponent from '../components/dice/index'

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
  @media (max-width: 1280px) {
    width: 100% !important;
  }
`



export default function Dice() {
  const [isEven, setEven] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [value, setValue] = useState()
  const [rotate, setRotate] = useState("");
  const [diceValue, setDiceValue] = useState(0); // integer state

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

  if (typeof window === 'undefined') return <></>;

  const possibleResult2s = {
		6: "rotateX(" + 3690 + "deg) rotateY(" + 3690 + "deg)",
		5: "rotateX(" + 3870 + "deg) rotateY(" + 3780 + "deg)",
		4: "rotateX(" + 3960 + "deg) rotateY(" + 3690 + "deg)",
		3: "rotateX(" + 3960 + "deg) rotateY(" + 3870 + "deg)",
		2: "rotateX(" + 3780 + "deg) rotateY(" + 3960 + "deg)",
		1: "rotateX(" + 3690 + "deg) rotateY(" + 3780 + "deg)",
	}
  const possibleResults = [
    "rotateX(" + 3600 + "deg) rotateY(" + 3600 + "deg)",
    "rotateX(" + 3780 + "deg) rotateY(" + 3960 + "deg)",
    "rotateX(" + 3960 + "deg) rotateY(" + 3870 + "deg)",
    "rotateX(" + 3960 + "deg) rotateY(" + 3690 + "deg)",
    "rotateX(" + 3870 + "deg) rotateY(" + 3780 + "deg)",
    "rotateX(" + 3690 + "deg) rotateY(" + 3690 + "deg)",
  ]

  const possibleResultsOriginal = {
		6: [90, 90],
		5: [270, 180],
		4: [360, 90],
		3: [360, 270],
		2: [180, 360],
		1: [90, 180],
	}


	const roll = () => {
		const xRand = Math.floor(Math.random() * 800000) * 90;
		const yRand = Math.floor(Math.random() * 800000) * 90;
		const rotate = "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)";
		setRotate(rotate);
	};

  const bet = async (betValue: number) => {
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

    const toTokenAccount = new web3.PublicKey('FiSVrKiJ1sQiqrV6FejNxNPcKorn225kBthh7WCJZPi3')
    var fromTokenAddress = null;

    for(let i = 0; i < parsed.value.length; i++) {
      if(parsed.value[i].account.data.parsed.info.mint === BIP_MINT) {
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
        description: `You got ${(winValue).toFixed(2)} $BIP back! They will be transferred in less than a minute! Keep going!!`,
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
        <Text fontSize="48px" fontWeight="600">Play Dice  🎲</Text>
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
            <Text fontSize="48px" fontWeight="bold" color={!isEven ? '#ABFC4F' : '#fff'}>Odd</Text>
            <Switch size="lg" isChecked={isEven} value={isEven ? 'isEven' : 'isOdd'} onChange={(e) => setEven(e.target.value !== 'isEven')} />
            <Text fontSize="48px" fontWeight="bold" color={isEven ? '#ABFC4F' : '#fff'}>Even</Text>
          </RowCentered>
          <Row>
            <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="1" width="180px" height="56px" onClick={() => bet(200)}>
              <Text fontSize="14px" fontWeight="bold" color="#000">200 $BIP</Text>
            </Button>
            <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="1" width="180px" height="56px" onClick={() => bet(1000)}>
              <Text fontSize="14px" fontWeight="bold" color="#000">1000 $BIP</Text>
            </Button>
            <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="1" width="180px" height="56px" borderColor="#fff" borderWidth="1px" backgroundColor="#000" onClick={onOpen}>
              <Text fontSize="14px" fontWeight="bold" color="#fff">Custom $BIP Value</Text>
            </Button>
          </Row>
          </motion.div>

        </InnerWrapper>
      </Wrapper>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color="#000" />
          <ModalBody paddingTop="60px">
            <Input width="100%" height="56px" placeholder="value in $BIP (max: 10,000)" color="#000" type="number" value={value} onChange={(e) => Number(e.target.value) <= 10000 && setValue(Number(e.target.value))} />
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} loadingText="Loading $BIP"  borderRadius="1" width="100%" height="56px" backgroundColor="#000" onClick={() => bet(value)}>
              <Text fontSize="14px" fontWeight="bold" color="#fff">Bet</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}
