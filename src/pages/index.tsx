import React, { useState, useContext } from 'react';
import { Layout } from '../components/common/layout';
import { Switch, Modal, ModalOverlay, useDisclosure, Checkbox, Button } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import CoinComponent from '../components/coin/index'
import {CurrencyContext} from './_app';
import { sendCurrencyToTreasure, renderButtons } from '../utils/solana'
import Space from '../components/common/space'
import LiveBets from '../components/live-bets/index'

import {
  Text,
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  padding-right: 90px;
`


const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 75vh;
  width: 100%;
  padding-top: 70px;
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
        <InnerWrapper>

          <motion.div
              style={{display: 'flex', flex: 3, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingRight: 20}}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, delay: 0.35 }}
            >
            <Text fontSize="48px" lineHeight={1} fontWeight="bold" color={'#fff'}>Need $SOL for next mint?</Text>
            <Text fontSize="48px" fontWeight="normal" color={'#fff'}>- Flip it</Text>
            <Space height={30}/>
            <Text fontSize="24px" fontWeight="normal" color={'#fff'}>With 50/50 chances of winning and a 2% fee!! All fees are shared between Octopus Holders</Text>
            <Space height={30} />
            <Button Button backgroundColor="#fff" borderRadius="2px" width="180px" height="56px" onClick={() => window.open('https://https://market.octopus.art/', '_ blank')}>
            <Text fontSize="14" fontWeight="bold" color={'#000'} style={{ whiteSpace: 'nowrap' }} >Buy an Octo</Text>
            </Button>

             </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
            style={{flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 40, borderRadius: 4}}
          >
              <CoinComponent isFlipped={isFlipped} isFlipping={isFlipping} textContent={textContent} diceValue={diceValue} />
              <RowCentered>
                <Text fontSize="48px" fontWeight="bold" color={!isEven ? '#22247C' : '#D5D4E7'}>Tails</Text>
                <Space width={10} />
                <Switch size="lg" isChecked={isEven} value={isEven ? 'isEven' : 'isOdd'} onChange={(e) => setEven(e.target.value !== 'isEven')} />
                <Space width={10} />
                <Text fontSize="48px" fontWeight="bold" color={isEven ? '#22247C' : '#D5D4E7'}>Head</Text>
                <Space width={50} />
                <Checkbox size='lg' colorScheme='green' onChange={(e) => setChecked(e.target.checked)} isChecked={isChecked}>
                  <Text fontSize="24px" fontWeight="medium" color={'#000'}>Auto</Text>
                </Checkbox>
                <Space width={15} />
              </RowCentered>
              {renderButtons(context.value, false, bet, inputValue, setValue, isLoading, onOpen)}

            </motion.div>
          </InnerWrapper>
          <Space height={20} />
          <LiveBets />
          <Space height={10} />

      </Wrapper>
    </Layout>
  );
}
