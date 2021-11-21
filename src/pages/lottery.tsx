import React, { useState } from 'react';
import { Layout } from '../components/common/layout';
import { Input, Button, Switch, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, ModalFooter } from '@chakra-ui/react';
import { motion } from "framer-motion";
import Lottie from 'react-lottie';

import * as animationData from '../components/common/ticket.json';


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
  position: relative;
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

var data = [
  { option: 'x0' },
  { option: 'x2' },
  { option: 'x4' },
  { option: 'x6' },
  { option: 'x8' },
  { option: 'x10' },
]

var disctionaire = [
0, 2, 4, 6, 8, 10
]

export default function WheelPage() {
  const [mustSpin, setMustSpin] = useState(false);
  const [betValue, setBetValue] = useState(0);
  const [value, setValue] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isLoading, setLoading] = useState(false)
  const toast = useToast();

  if (typeof window === 'undefined') return null;

  const finishSpinning = () => {
    setLoading(false);
    const multiplier = disctionaire[prizeNumber];

    if(multiplier > 0) {
      const winValue = betValue * multiplier;

      toast({
        title: `Yayyyy!!`,
        description: `You got ${(winValue).toFixed(2)} $BIP back! Keep going!!`,
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        variant: 'solid'
      });
      //onClose();
    } else {
      toast({
        title: `Ops.`,
        description: 'Not your lucky play, try again',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        variant: 'solid'
      });
      //onClose();
    }
  }

  const bet = async (betValue: number) => {
    setBetValue(betValue);
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
    setLoading(true);


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
        <Text fontSize="24px" fontWeight="500">Buy a lottery ticket per 0.05 $SOL</Text>
        <Text fontSize="16px" fontWeight="500">ps: raffle every time we reach 105 $SOL</Text>
        <Text fontSize="48px" fontWeight="600">Win up to 100 $SOL!! | #1</Text>
        </motion.div>
        <InnerWrapper>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
          >
            <Lottie options={{
              loop: false,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
              height={400}
              width={800}
              />
          </motion.div>
          <motion.div
            style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 30}}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
          <Row>
            <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="1" width="180px" height="56px" onClick={() => bet(1)}>
              <Text fontSize="14px" fontWeight="bold" color="#000">Buy 1 Ticket</Text>
            </Button>
            <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="1" width="180px" height="56px" onClick={() => bet(5)}>
              <Text fontSize="14px" fontWeight="bold" color="#000">Buy 5 Tickets</Text>
            </Button>
            <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="1" width="180px" height="56px" borderColor="#fff" borderWidth="1px" backgroundColor="#000" onClick={onOpen}>
              <Text fontSize="14px" fontWeight="bold" color="#fff">Custom</Text>
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
            <Input width="100%" height="56px" placeholder="value in $BIP (eg: 5000)" color="#000" type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
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
