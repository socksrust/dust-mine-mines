import React, { useState, useRef } from 'react';
import { Layout } from '../components/common/layout';
import { Input, Button, Switch, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, ModalFooter } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import * as splToken from '@solana/spl-token';
import WheelComponent from '../components/wheel/index'

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
  width: 246px;
  padding: 10px 0px;
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



export default function Wheel() {
  const audioRef = useRef<any>(null)

  const [isEven, setEven] = useState(false)
  const [isBlack, setBlack] = useState(false)
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


  const redOdd = [0, 4, 8, 12]
  const blackOdd = [1, 5, 9, 13]
  const redEven = [2, 6, 10, 14]
  const blackEven = [3, 7, 11, 15]

  const possibleResults = [
    "rotate(3deg)", //odd, red
    "rotate(13deg)", //odd
    "rotate(23deg)", //even, red
    "rotate(32deg)", //even
    "rotate(42deg)", //odd, red
    "rotate(52deg)", //odd
    "rotate(61deg)", //even, red
    "rotate(71deg)", //even
    "rotate(81deg)", //odd, red
    "rotate(91deg)", //odd
    "rotate(101deg)", //even, red
    "rotate(110deg)", //even
    "rotate(120deg)", //odd, red
    "rotate(130deg)", //odd
    "rotate(140deg)", //even, red
    "rotate(150deg)", //even 24

    "rotate(159deg)", //odd, red
    "rotate(168deg)", //even
    "rotate(179deg)", //odd, red
    "rotate(189deg)", //even
    "rotate(198deg)", //even 30, red
    "rotate(207deg)", //odd
    "rotate(217deg)", //even, red
    "rotate(227deg)", //odd
    "rotate(237deg)", //odd 27, red
    "rotate(246deg)", //even 6
    "rotate(256deg)", //even, red
    "rotate(266deg)", //odd 17
    "rotate(276deg)", //odd 25, red
    "rotate(286deg)", //even 2
    "rotate(296deg)", //odd 21, red
    "rotate(305deg)", //even 4
    "rotate(315deg)", //odd, red
    "rotate(325deg)", //odd
    "rotate(335deg)", //even, red
    //"rotate(345deg)",
    "rotate(355deg)", //even
  ]



	const roll = () => {
		const xRand = 6000000;
		const rotate = "rotate(" + xRand + "deg)";
		setRotate(rotate);
	};

  const bet = async (betValue: number) => {
    audioRef?.current?.play()
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

    const resp = await fetch("https://bip-gamex.herokuapp.com/api/v1/transaction/wheelBet", {
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
    const dice = Math.floor(Math.random() * 4);
    const isRedEven = !isBlack && isEven
    const isBlackEven = isBlack && isEven
    const isRedOdd = !isBlack && !isEven
    const isBlackOdd = isBlack && !isEven
    let winningArr: any = [];
    let losingArr: any = [];
    if(isRedEven) {
      winningArr = [...redEven]
      losingArr = [...blackEven]
    }else if(isBlackEven) {
      winningArr = [...blackEven]
      losingArr = [...redEven]
    }else if(isRedOdd) {
      winningArr = [...redOdd]
      losingArr = [...blackOdd]
    }else if(isBlackOdd) {
      winningArr = [...blackOdd]
      losingArr = [...redOdd]
    }


    if(parsedResult?.data?.won) {
      audioRef?.current?.load()
      //isEven ? 2, 4, 6 : 1, 3, 5;

      console.log('possibleResults[winningArr[dice]]', possibleResults[winningArr[dice]])

      setRotate(possibleResults[winningArr[dice]]);
      const winValue = betValue * 4;

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
      audioRef?.current?.load()

      console.log('possibleResults[losingArr[dice]]', possibleResults[losingArr[dice]])
      setRotate(possibleResults[losingArr[dice]]);
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
            <WheelComponent isRolling={isLoading} rotate={rotate} diceValue={diceValue} />
          </motion.div>
          <motion.div
            style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
          <RowCentered/>
          <RowCentered/>
          <RowCentered>
            <Text fontSize="36px" fontWeight="bold" color={!isEven ? '#ABFC4F' : '#fff'}>Odd</Text>
            <Switch size="lg" isChecked={isEven} value={isEven ? 'isEven' : 'isOdd'} onChange={(e) => setEven(e.target.value !== 'isEven')} />
            <Text fontSize="36px" fontWeight="bold" color={isEven ? '#ABFC4F' : '#fff'}>Even</Text>
          </RowCentered>
          <RowCentered>
            <Text fontSize="36px" fontWeight="bold" color={!isBlack ? '#ABFC4F' : '#fff'}>Red</Text>
            <Switch size="lg" isChecked={isBlack} value={isBlack ? 'isBlack' : 'isRed'} onChange={(e) => setBlack(e.target.value !== 'isBlack')} />
            <Text fontSize="36px" fontWeight="bold" color={isBlack ? '#ABFC4F' : '#fff'}>Black</Text>
          </RowCentered>
          <RowCentered/>
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
      <audio
        src='/audios/wheel.mp3'
        autoPlay={false}
        ref={audioRef}
        //onPlay={() => setPlayingState(true)}
        //onPause={() => setPlayingState(false)}
      />
    </Layout>
  );
}
