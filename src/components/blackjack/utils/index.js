import React from "react";

const RANKS = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const SUITS = ["♠", "♥", "♣", "♦"];

export const initializeUserCardList = ({ setUserCardList, userCardsTotal, setUserCardsTotal }) => {
  let cardList = [];
  let total = 0;
  for(let i of [1,2]) {
    const suitsIndex = Math.floor(Math.random() * 4);
    const ranksIndex = Math.floor(Math.random() * 6);

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

  const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;


  setHouseCardsTotal(houseCardsTotal + ranksIndex)
  setHouseCardList([{ suit, rank }])
};

export const handleHitClick = ({ won, userCardsTotal, setUserCardsTotal, userCardList, setUserCardList }) => {
  const suitsIndex = Math.floor(Math.random() * 4);
  const suit = SUITS[suitsIndex]
  const missingPoints = 21 - userCardsTotal;

  if(won) {
    if(missingPoints > 10) {
      const ranksIndex = Math.floor(Math.random() * 13);
      const rank = RANKS[ranksIndex]

      const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

      setUserCardsTotal(userCardsTotal + newRankIndex)
      setUserCardList([...userCardList, { suit, rank }])
      return false
    } else {
      const rank = RANKS[missingPoints - 1]
      console.log('missingPoints', missingPoints)
      console.log('rank', rank)
      setUserCardsTotal(21)
      setUserCardList([...userCardList, { suit, rank }])
      return true;
    }

  } else {
    if(missingPoints > 10) {
      //Cant explode now
      const ranksIndex = Math.floor(Math.random() * 13);
      const rank = RANKS[ranksIndex]

      const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

      setUserCardsTotal(userCardsTotal + newRankIndex)
      setUserCardList([...userCardList, { suit, rank }])
      return false;
    } else {
      const minimumPoints = missingPoints + 1;

      const ranksIndex = Math.floor(Math.random() * 13);

      const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

      const rank = RANKS[ranksIndex]
      setUserCardsTotal(userCardsTotal + newRankIndex)
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
    if(missingPoints > 10) {
      //Cant explode now
      const ranksIndex = Math.floor(Math.random() * 11);
      const rank = RANKS[ranksIndex]
      const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

      setHouseCardsTotal(houseCardsTotal + newRankIndex)
      setHouseCardList([...houseCardList, { suit, rank }])
      return false;
    } else {
      // explode
      const minimumPoints = missingPoints + 1;
      const ranksIndex = Math.floor(Math.random() * 11);
      const rank = RANKS[ranksIndex]
      const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

      setHouseCardsTotal(houseCardsTotal + newRankIndex)
      setHouseCardList([...houseCardList, { suit, rank }])
      return true;
    }


  }
  else {
    //Lost
    if(missingPoints > 10) {
      //Cant explode now
      const ranksIndex = Math.floor(Math.random() * 11);
      const rank = RANKS[ranksIndex]
      const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

      setHouseCardsTotal(houseCardsTotal + newRankIndex)
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