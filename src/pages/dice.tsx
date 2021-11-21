import React, { useState } from 'react';
import { Layout } from '../components/common/layout';
import { Input, Button, Switch, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, ModalFooter } from '@chakra-ui/react';
import { motion } from "framer-motion";

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
`



export default function Dice() {
  const [isEven, setEven] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [value, setValue] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

  if (typeof window === 'undefined') return <></>;

  const bet = async (betValue: number) => {
    const won = true;
    setLoading(true);

    if(won) {
      const winValue = betValue * 1.96;

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
            <Image
                src="/images/dice-banner.png"
                maxW="450px"
              />
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
            <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="1" width="180px" height="56px" onClick={() => bet(60)}>
              <Text fontSize="14px" fontWeight="bold" color="#000">60 $BIP</Text>
            </Button>
            <Button isLoading={isLoading} loadingText="Loading $BIP" borderRadius="1" width="180px" height="56px" onClick={() => bet(180)}>
              <Text fontSize="14px" fontWeight="bold" color="#000">180 $BIP</Text>
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
