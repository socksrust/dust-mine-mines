import React, { useState, useEffect } from "react";
import Card from './components/Card'
import styled from '@emotion/styled';
import Space from '../common/space'
import constants from '../../utils/constants';
import {
  useToast,
} from '@chakra-ui/react';

const { colors, infos, objects: { coins } } = constants;
const { primaryBackground, secondaryBackground, objectBackground, objectText, buttonText } = colors;

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
  background: #5D5FEF;
  border-radius: 1rem;
`

const BlackjackComponent = ({ won, isPaymentVerified, setVerified }) => {
  const [userCardList, setUserCardList] = useState([]);
  const [userCardsTotal, setUserCardsTotal] = useState(0);

  const [houseCardList, setHouseCardList] = useState([]);
  const [houseCardsTotal, setHouseCardsTotal] = useState(0);

  const [isDisabled, setIsDisabled] = useState(true);

  const toast = useToast();


  useEffect(() => {
    if(isPaymentVerified) {
      setIsDisabled(false)
      initializeUserCardList({ setUserCardList, userCardsTotal, setUserCardsTotal })
      initializeHouseCardList({ setHouseCardList, houseCardsTotal, setHouseCardsTotal })
    }
  }, [isPaymentVerified]);

  const hitClickCb = (props) => {
    const isEnd = handleHitClick(props)

    if(!isEnd) {
      return;
    }

    if(won) {
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

    return setIsDisabled(true);
  }

  const standClickCb = (props) => {
    const isEnd = handleStandClick(props)

    if(!isEnd) {
      return;
    }

    if(won) {
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

    return setIsDisabled(true);
  }



  return (
    <main className="table">
      <Wrapper>
        <RowCentered>
          <Text fontSize={30}>{houseCardsTotal}</Text>
        </RowCentered>
        <CardsWrapper>
          {houseCardList.map(({suit, rank}) => (
            <Card
              rank={rank}
              suit={suit}
            />
          ))}
        </CardsWrapper>
        <RowCentered>
          <Text color="#FFA33A" fontFamily="MontSerrat" fontWeight={"black"} fontSize={"50px"} fontStyle="italic">VS.</Text>
        </RowCentered>
        <CardsWrapper>
          {userCardList.map(({suit, rank}) => (
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
      <Space height={12}/>
      <Row>
        <Button disabled={!isPaymentVerified || isDisabled} backgroundColor={objectBackground} borderRadius="2rem" width="110px" height="34px" borderColor={objectBackground} borderWidth="1px" onClick={() => hitClickCb({ won, userCardsTotal, setUserCardsTotal, userCardList, setUserCardList })}>
          <Text fontSize="14px" fontWeight="bold" color={buttonText}>HIT</Text>
        </Button>
        <Space width={20}/>
        <Button disabled={!isPaymentVerified || isDisabled} backgroundColor={objectBackground} borderRadius="2rem" width="110px" height="34px" borderColor={objectBackground} borderWidth="1px" onClick={() => standClickCb({ won, houseCardsTotal, setHouseCardsTotal, houseCardList, setHouseCardList })}>
          <Text fontSize="14px" fontWeight="bold" color={buttonText}>STAND</Text>
        </Button>
      </Row>
    </main>
  );
};

export default BlackjackComponent;
