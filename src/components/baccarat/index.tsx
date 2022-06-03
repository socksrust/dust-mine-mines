import React, { useState, useEffect } from "react";
import Card from './components/Card'
import styled from '@emotion/styled';
import Space from '../common/space'
import constants from '../../utils/constants';
import {
  useToast,
} from '@chakra-ui/react';

const { colors, infos, objects: { coins } } = constants;
const { accentColor, primaryBackground, secondaryBackground, objectBackground, objectText, buttonText } = colors;

import {
  Text,
  Button
} from '@chakra-ui/react';

import { initializeUserCardList, initializeHouseCardList, handleHitClick, handleStandClick } from './utils/index'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: center;
  width: 900px;
  @media (max-width: 750px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`

const RowCentered = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 233px;
  height: 172px;
  background-color: rgba(7,112,47, 1)
  border-radius: 1rem;
  border: 1px solid ${secondaryBackground};
  border-radius: 6px;
`

const DealerArea = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 20%;
  font-size: 32px;
  color: #FFF;
  font-weight: 500;

  @media (max-width: 750px) {
    justify-content: center;
    padding-right: 0;
  }
`

const BaccaratComponent = ({ won, isPaymentVerified, setVerified, updateBalances, selected, setSelected }) => {
  const [userCardList, setUserCardList] = useState([]);
  const [userCardsTotal, setUserCardsTotal] = useState(0);
  const [isEnd, setIsEnd] = useState({ acabou: false, rodou: 0 })

  const [houseCardList, setHouseCardList] = useState([]);
  const [houseCardsTotal, setHouseCardsTotal] = useState(0);
  // const [selected, setSelected] = useState('PLAYER')

  const [isDisabled, setIsDisabled] = useState(false);

  const toast = useToast();


  useEffect(() => {
    if (isPaymentVerified) {
      console.clear()
      setIsDisabled(true)
      if (selected === 'PLAYER') {
        const user = initializeUserCardList({ setUserCardList, userCardsTotal, setUserCardsTotal, won, selected })
        initializeHouseCardList({ setHouseCardList, houseCardsTotal, setHouseCardsTotal, won, selected, userCardsTotal: user })
      } else if (selected === 'HOUSE') {
        const user = initializeUserCardList({ setUserCardList, userCardsTotal, setUserCardsTotal, won: !won, selected })
        initializeHouseCardList({ setHouseCardList, houseCardsTotal, setHouseCardsTotal, won: !won, selected, userCardsTotal: user })
      } else {
        const user = initializeUserCardList({ setUserCardList, userCardsTotal, setUserCardsTotal, won, selected })
        initializeHouseCardList({ setHouseCardList, houseCardsTotal, setHouseCardsTotal, won, selected, userCardsTotal: user })
      }
      setIsDisabled(false)
    }
  }, [isPaymentVerified]);

  const hitClickCb = (props) => {
    const isEnd = handleHitClick(props)

    if (!isEnd) {
      return;
    }

    if (won) {
      updateBalances()
      toast({
        title: `Yayyyy!!`,
        description: `You WON! Tokens will be transferred in less than a minute! Keep going!!`,
        status: 'info',
        duration: 15000,
        isClosable: true,
        position: 'bottom-right',
        variant: 'solid'
      });
    } else {
      updateBalances()
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
    setIsDisabled(false);
  }

  const standClickCb = (props) => {
    const acabou = handleStandClick(props)
    setIsEnd({ acabou, rodou: 1 })
    setIsDisabled(false);

    if (!acabou) {
      return
    }

    if (won) {
      toast({
        title: `Yayyyy!!`,
        description: `You WON! Tokens will be transferred in less than a minute! Keep going!!`,
        status: 'info',
        duration: 15000,
        isClosable: true,
        position: 'bottom-right',
        variant: 'solid'
      });
      updateBalances()
    } else {
      toast({
        title: `Ops.`,
        description: 'Not your lucky play, try again',
        status: 'warning',
        duration: 15000,
        isClosable: true,
        position: 'bottom-right',
        variant: 'solid'
      });
      updateBalances()
    }
    return
  }

  return (
    <main className="table">
      <DealerArea>
        House
      </DealerArea>
      <Wrapper>
        <RowCentered>
          <Text fontSize={30}>{houseCardsTotal}</Text>
        </RowCentered>
        <CardsWrapper>
          {houseCardList.map(({ suit, rank }) => (
            <Card
              rank={rank}
              suit={suit}
            />
          ))}
        </CardsWrapper>
        <RowCentered>
          <Text color='#FFF' fontFamily="MontSerrat" fontWeight={"black"} fontSize={"50px"} fontStyle="italic">VS.</Text>
        </RowCentered>
        <CardsWrapper>
          {userCardList.map(({ suit, rank }) => (
            <Card
              rank={rank}
              suit={suit}
            />
          ))}
        </CardsWrapper>
        <RowCentered>
          <Text fontSize={30}>{userCardsTotal}</Text>
        </RowCentered>
      </Wrapper>
      <Space height={12} />
      <Row>
        <Button disabled={selected === 'PLAYER' || isDisabled} backgroundColor={objectBackground} borderRadius="2rem" width="110px" height="34px" borderColor={objectBackground} borderWidth="1px" onClick={() => setSelected('PLAYER')}>
          <Text fontSize="14px" fontWeight="bold" color={buttonText}>Player</Text>
        </Button>
        <Space width={20} />
        <Button disabled={selected === 'TIE' || isDisabled} backgroundColor={objectBackground} borderRadius="2rem" width="110px" height="34px" borderColor={objectBackground} borderWidth="1px" onClick={() => setSelected('TIE')}>
          <Text fontSize="14px" fontWeight="bold" color={buttonText}>Tie</Text>
        </Button>
        <Space width={20} />
        <Button disabled={selected === 'HOUSE' || isDisabled} backgroundColor={objectBackground} borderRadius="2rem" width="110px" height="34px" borderColor={objectBackground} borderWidth="1px" onClick={() => setSelected('HOUSE')}>
          <Text fontSize="14px" fontWeight="bold" color={buttonText}>House</Text>
        </Button>
      </Row>
    </main>
  );
};

export default BaccaratComponent;
