import React from "react";

const RANKS = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const SUITS = ["♠", "♥", "♣", "♦"];

export const initializeUserCardList = ({ setUserCardList, userCardsTotal, setUserCardsTotal }) => {
  let cardList = [];
  let total = 0;
  for(let i of [1,2]) {
    const suitsIndex = Math.floor(Math.random() * 4);
    const ranksIndex = Math.floor(Math.random() * 13);

    const suit = SUITS[suitsIndex]
    const rank = RANKS[ranksIndex]

    total = total + ranksIndex + 1;

    cardList = [...cardList, { suit, rank }]
  }
  setUserCardsTotal(total)
  setUserCardList(cardList)
};

export const initializeHouseCardList = ({ setHouseCardList, houseCardsTotal, setHouseCardsTotal }) => {
  const suitsIndex = Math.floor(Math.random() * 4);
  const ranksIndex = Math.floor(Math.random() * 13);

  const suit = SUITS[suitsIndex]
  const rank = RANKS[ranksIndex]

  setHouseCardsTotal(houseCardsTotal + ranksIndex + 1)
  setHouseCardList([{ suit, rank }])
};

export const handleHitClick = ({ won, userCardsTotal, setUserCardsTotal, userCardList, setUserCardList }) => {
  const suitsIndex = Math.floor(Math.random() * 4);
  const suit = SUITS[suitsIndex]
  const missingPoints = 21 - userCardsTotal;

  if(won) {
    const rank = RANKS[missingPoints - 1]
    setUserCardsTotal(21)
    setUserCardList([...userCardList, { suit, rank }])
    return true;
  } else {
    if(missingPoints > 13) {
      //Cant explode now
      const ranksIndex = Math.floor(Math.random() * (missingPoints - 1));
      const rank = RANKS[ranksIndex]
      setUserCardsTotal(userCardsTotal + ranksIndex + 1)
      setUserCardList([...userCardList, { suit, rank }])
      return false;
    } else {
      const minimumPoints = missingPoints + 1;

      const ranksIndex = Math.floor(Math.random() * 13);

      const rank = RANKS[ranksIndex]
      setUserCardsTotal(userCardsTotal + ranksIndex + 1)
      setUserCardList([...userCardList, { suit, rank }])
      return true;
    }
  }


}


export const handleStandClick = ({ won, houseCardsTotal, setHouseCardsTotal, houseCardList, setHouseCardList }) => {
  const suitsIndex = Math.floor(Math.random() * 4);
  const suit = SUITS[suitsIndex]
  const missingPoints = 21 - houseCardsTotal;

  if(won) {
    if(missingPoints > 13) {
      //Cant explode now
      const ranksIndex = Math.floor(Math.random() * (missingPoints - 1));
      const rank = RANKS[ranksIndex]
      setHouseCardsTotal(houseCardsTotal + ranksIndex + 1)
      setHouseCardList([...houseCardList, { suit, rank }])
      return false;
    } else {
      // explode
      const minimumPoints = missingPoints + 1;
      const ranksIndex = Math.floor(Math.random() * 13);
      const rank = RANKS[ranksIndex]
      setHouseCardsTotal(houseCardsTotal + ranksIndex + 1)
      setHouseCardList([...houseCardList, { suit, rank }])
      return true;
    }


  }
  else {
    //Lost
    if(missingPoints > 13) {
      //Cant explode now
      const ranksIndex = Math.floor(Math.random() * (missingPoints - 1));
      const rank = RANKS[ranksIndex]
      setHouseCardsTotal(houseCardsTotal + ranksIndex + 1)
      setHouseCardList([...houseCardList, { suit, rank }])
      return false;
    } else {
      const rank = RANKS[missingPoints + 1]
      setHouseCardsTotal(21)
      setHouseCardList([...houseCardList, { suit, rank }])
      return true;
    }


  }


}