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
const RANKS = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const SUITS = ["♠", "♥", "♣", "♦"];

const initializeCardList = () => {
  const cardList = [];
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      cardList.push({ rank, suit });
    });
  });
  return cardList;
};

const initializeUserCardList = ({ setUserCardList }) => {
  let cardList = [];
  for(let i of [1,2]) {
    const suitsIndex = Math.floor(Math.random() * 4);
    const ranksIndex = Math.floor(Math.random() * 13);
    
    const suit = SUITS[suitsIndex]
    const rank = RANKS[ranksIndex]

    cardList = [...cardList, { suit, rank }]
  }

  setUserCardList(cardList)
};

const initializeHouseCardList = ({ setHouseCardList }) => {
  const suitsIndex = Math.floor(Math.random() * 4);
  const ranksIndex = Math.floor(Math.random() * 13);

  const suit = SUITS[suitsIndex]
  const rank = RANKS[ranksIndex]


  setHouseCardList([{ suit, rank }])
};


const RowCentered = styled.div`
  display: flex;
  justify-content: center;
`

const Table = () => {
  const [cardList, setCardList] = useState([]);
  const [userCardList, setUserCardList] = useState([]);
  const [houseCardList, setHouseCardList] = useState([]);

  useEffect(() => {
    const initialCardList = initializeCardList();
    setCardList(initialCardList);

    initializeUserCardList({ setUserCardList })
    initializeHouseCardList({ setHouseCardList })
  }, []);

  return (
    <main className="table">
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
      <Space height={20}/>
      <RowCentered>
        <Button backgroundColor={objectBackground} borderRadius="2rem" width="110px" height="34px" borderColor={objectBackground} borderWidth="1px">
          <Text fontSize="14px" fontWeight="bold" color={primaryBackground}>HIT</Text>
        </Button>
        <Space width={20}/>
        <Button backgroundColor={objectBackground} borderRadius="2rem" width="110px" height="34px" borderColor={objectBackground} borderWidth="1px">
          <Text fontSize="14px" fontWeight="bold" color={primaryBackground}>STAND</Text>
        </Button>

      </RowCentered>
    </main>
  );
};

export default Table;
