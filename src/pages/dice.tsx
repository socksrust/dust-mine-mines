import React, { useState, useContext } from 'react';
import { Layout } from '../components/common/layout';
import { Switch, Modal, ModalOverlay, useDisclosure, Checkbox } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import DiceComponent from '../components/dice/index'
import {CurrencyContext} from './_app';
import { sendCurrencyToTreasure, renderButtons } from '../utils/solana'
import Space from '../components/common/space'

import {
  Text,
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #151990;
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
  width: 400px;
  padding: 30px 0px;
`


export default function Dice() {
  const [isEven, setEven] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [inputValue, setValue] = useState()
  const [isChecked, setChecked] = useState(false)
  const [rotate, setRotate] = useState("");
  const [diceValue, setDiceValue] = useState(0); // integer state
  const context = useContext(CurrencyContext)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { sendTransaction, publicKey } = useWallet();
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


    //START
    const parsedResult = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'diceBet', publicKey })
    //END


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
        description: `You got $${(winValue).toFixed(2)} back! They will be transferred in less than a minute! Keep going!!`,
        status: 'info',
        duration: 15000,
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
            <Space width={10} />
            <Switch size="lg" isChecked={isEven} value={isEven ? 'isEven' : 'isOdd'} onChange={(e) => setEven(e.target.value !== 'isEven')} />
            <Space width={10} />
            <Text fontSize="48px" fontWeight="bold" color={isEven ? '#fff' : 'rgba(255,255,255, 0.6)'}>Even</Text>
            <Space width={50} />
            <Checkbox size='lg' colorScheme='green' onChange={(e) => setChecked(e.target.checked)} isChecked={isChecked}>
              <Text fontSize="24px" fontWeight="medium" color={'#fff'}>Auto</Text>
            </Checkbox>
            <Space width={15} />
          </RowCentered>
          {renderButtons(context.value, false, bet, inputValue, setValue, isLoading, onOpen)}
          </motion.div>

        </InnerWrapper>
      </Wrapper>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        {renderButtons(context.value, true, bet, inputValue, setValue, isLoading, onOpen)}
      </Modal>
    </Layout>
  );
}
