import React, { useState, useRef, useContext } from 'react';
import { Layout } from '../components/common/layout';
import { Switch, Modal, ModalOverlay, Checkbox, useDisclosure } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import WheelComponent from '../components/wheel/index'
import { sendCurrencyToTreasure, renderButtons } from '../utils/solana'
import {CurrencyContext} from './_app';
import Space from '../components/common/space'
import constants from '../utils/constants';

const { colors } = constants;
const { secondaryBackground, accentColor, objectText } = colors;

const MASTER_PK = 'B8e4g2SP7AC9SqQXPChEEmduhwBuZ8MTMb5xEGUchU2t';
const connect = new web3.Connection('https://proud-cold-snowflake.solana-mainnet.quiknode.pro');
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
  flex: 1;
`


const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: 75vh;
  width: 100%;
  padding-top: 20px;
  @media (max-width: 1250px) {
    height: 100%;
    flex-direction: column;
    padding-bottom: 40px;
  }
`

const RowCentered = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 246px;
  padding-top: 10px;
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
  const context = useContext(CurrencyContext)

  const [isEven, setEven] = useState(false)
  const [isBlack, setBlack] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [inputValue, setValue] = useState()
  const [rotate, setRotate] = useState("");
  const [diceValue, setDiceValue] = useState(0); // integer state
  const [isChecked, setChecked] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { sendTransaction, publicKey } = useWallet();
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

  const bet = async (betValue: number, mintAddress: string, toTokenAccountAddress: string) => {
    audioRef?.current?.play()

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

    const { parsedResult } = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'wheelBet', publicKey })

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


      setRotate(possibleResults[winningArr[dice]]);
      const winValue = betValue * 2;

      toast({
        title: `Yayyyy!!`,
        description: `You got $${(winValue).toFixed(2)} $TREATS back! They will be transferred in less than a minute! Keep going!!`,
        status: 'info',
        duration: 15000,
        isClosable: true,
        position: 'bottom-right',
        variant: 'solid'
      });
    } else {
      audioRef?.current?.load()

      setRotate(possibleResults[losingArr[dice]]);
      toast({
        title: `Ops.`,
        description: 'Not your lucky play, try again',
        status: 'warning',
        duration: 15000,
        isClosable: true,
        position: 'bottom-right',
        variant: 'solid'
      });
    }
    if(isChecked) {
      await bet(betValue, mintAddress, toTokenAccountAddress);
    }
  }

  return (
    <Layout>
      <Wrapper>
        <InnerWrapper>
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
            style={{overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, .25)', padding: 20, borderRadius: 4}}
          >
            <WheelComponent isRolling={isLoading} rotate={rotate} diceValue={diceValue} />
          <RowCentered/>
          <RowCentered/>
          <RowCentered>
            <Text fontSize="36px" fontWeight="bold" color={!isEven ? '#fff' : 'rgba(255,255,255, 0.6)'}>Odd</Text>
            <Switch size="lg" isChecked={isEven} value={isEven ? 'isEven' : 'isOdd'} onChange={(e) => setEven(e.target.value !== 'isEven')} />
            <Text fontSize="36px" fontWeight="bold" color={isEven ? '#fff' : 'rgba(255,255,255, 0.6)'}>Even</Text>
          </RowCentered>
          <RowCentered>
            <Text fontSize="36px" fontWeight="bold" color={!isBlack ? '#fff' : 'rgba(255,255,255, 0.6)'}>Orange</Text>
            <Switch size="lg" isChecked={isBlack} value={isBlack ? 'isBlack' : 'isRed'} onChange={(e) => setBlack(e.target.value !== 'isBlack')} />
            <Text fontSize="36px" fontWeight="bold" color={isBlack ? '#fff' : 'rgba(255,255,255, 0.6)'}>Black</Text>
          </RowCentered>
          <RowCentered/>
          {renderButtons(context.value, false, bet, inputValue, setValue, isLoading, onOpen)}
          </motion.div>
        </InnerWrapper>
      </Wrapper>
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
