import React, { useState, useEffect } from "react";
import Card from './components/Card'
import styled from '@emotion/styled';
import Space from '../common/space'
import constants from '../../utils/constants';

const { colors, infos, objects: { coins } } = constants;
const { primaryBackground, secondaryBackground, objectBackground, objectText, buttonText } = colors;

import {
  Text,
  Button
} from '@chakra-ui/react';

import { initializeUserCardList, initializeHouseCardList, handleHitClick, handleStandClick } from './utils/index'

const RowCentered = styled.div`
  display: flex;
  justify-content: center;
`

const BlackjackComponent = ({ won, isPaymentVerified }) => {
  const [userCardList, setUserCardList] = useState([]);
  const [userCardsTotal, setUserCardsTotal] = useState(0);

  const [houseCardList, setHouseCardList] = useState([]);
  const [houseCardsTotal, setHouseCardsTotal] = useState(0);

  useEffect(() => {
    initializeUserCardList({ setUserCardList, userCardsTotal, setUserCardsTotal })
    initializeHouseCardList({ setHouseCardList, houseCardsTotal, setHouseCardsTotal })
  }, []);

  return (
    <main className="table">
      <RowCentered>
        <Text fontSize={30}>{houseCardsTotal}</Text>
      </RowCentered>
      <RowCentered>
        {houseCardList.map(({suit, rank}) => (
          <Card
            rank={rank}
            suit={suit}
          />
        ))}
      </RowCentered>
      <Space height={20}/>
      <RowCentered>
        <Text fontSize={30}>Vs.</Text>
      </RowCentered>
      <Space height={20}/>
      <RowCentered>
        {userCardList.map(({suit, rank}) => (
          <Card
            rank={rank}
            suit={suit}
          />
        ))}
      </RowCentered>
      <RowCentered>
        <Text fontSize={30}>{userCardsTotal}</Text>
      </RowCentered>
      <Space height={20}/>
      <RowCentered>
        <Button disabled={!isPaymentVerified} backgroundColor={objectBackground} borderRadius="2rem" width="110px" height="34px" borderColor={objectBackground} borderWidth="1px" onClick={() => handleHitClick({ won, userCardsTotal, setUserCardsTotal, userCardList, setUserCardList })}>
          <Text fontSize="14px" fontWeight="bold" color={primaryBackground}>HIT</Text>
        </Button>
        <Space width={20}/>
        <Button disabled={!isPaymentVerified} backgroundColor={objectBackground} borderRadius="2rem" width="110px" height="34px" borderColor={objectBackground} borderWidth="1px" onClick={() => handleStandClick({ won, houseCardsTotal, setHouseCardsTotal, houseCardList, setHouseCardList })}>
          <Text fontSize="14px" fontWeight="bold" color={primaryBackground}>STAND</Text>
        </Button>
      </RowCentered>
    </main>
  );
};

export default BlackjackComponent;
