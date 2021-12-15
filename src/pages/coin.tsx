import React, { useState, useContext } from 'react';
import { Layout } from '../components/common/layout';
import { Switch, Modal, ModalOverlay, useDisclosure, Checkbox } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import CoinComponent from '../components/coin/index'
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
  width: 400px;
  padding: 30px 0px;
`


export default function Coin() {
  const [isEven, setEven] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isFlipping, setFlipping] = useState(false)
  const [isFlipped, setFlipped] = useState(false)
  const [inputValue, setValue] = useState()
  const [isChecked, setChecked] = useState(false)
  const [textContent, setTextContent] = useState("Head");
  const [diceValue, setDiceValue] = useState(0); // integer state
  const context = useContext(CurrencyContext)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { sendTransaction, publicKey } = useWallet();
  const { connection } = useConnection();

  const flip = ({ parsedResult, betValue }: any) => {
    setTextContent('')
    setFlipping(true);
    setFlipped(!isFlipped);
    setTimeout(() => {
      setFlipping(false)
      if(parsedResult?.data?.won) {

        //isEven ? 2, 4, 6 : 1, 3, 5;
        const realResult = isEven ? 'Head' : 'Tails';


        setTextContent(realResult);
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
        const realResult = !isEven ? 'Head' : 'Tails';

        //isEven ? 1, 3, 5 : 2, 4, 6 ;
        setTextContent(realResult);
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
    }, 1000);
  }

  if (typeof window === 'undefined') return <></>;


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
    setLoading(true);


    //START
    const parsedResult = await sendCurrencyToTreasure({ fromWallet, toast, toTokenAccountAddress, mintAddress, betValue, sendTransaction, connection, endpoint: 'coinBet', publicKey })
    //END


    setLoading(false);
    onClose();
    flip({ parsedResult, betValue })

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
            <CoinComponent isFlipped={isFlipped} isFlipping={isFlipping} textContent={textContent} diceValue={diceValue} />
          </motion.div>
          <motion.div
            style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
          <RowCentered>
            <Text fontSize="48px" fontWeight="bold" color={!isEven ? '#fff' : 'rgba(255,255,255, 0.6)'}>Tails</Text>
            <Space width={10} />
            <Switch size="lg" isChecked={isEven} value={isEven ? 'isEven' : 'isOdd'} onChange={(e) => setEven(e.target.value !== 'isEven')} />
            <Space width={10} />
            <Text fontSize="48px" fontWeight="bold" color={isEven ? '#fff' : 'rgba(255,255,255, 0.6)'}>Head</Text>
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
