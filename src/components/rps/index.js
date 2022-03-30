import React, { useState } from "react";
import styled from '@emotion/styled'
import {
  Text,
} from '@chakra-ui/react';
import Space from '../common/space'
import Carousel from './carousel'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import constants from '../../utils/constants'
const { colors: {accentColor, objectText}} = constants;



const WholeContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 910px;
  @media (max-width: 1154px) {
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;


const RPSImg = styled.img`
  width: 190px;
  border-radius: 50%;
  border: 5px solid ${accentColor};
`;


const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;



const ArrowWrapper = styled.div`
  background: ${accentColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
`;

const WinnerText = styled.p``;

const Buttons = styled.button``;

const Labels = styled.p``;

const Title = styled.h1``;

export default function RockPaperScissors({ option, pcOption, isLoading, setOption, setPcOption }) {
  const guesses = [
    {
      name: "Rock",
      img:
        "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/271/rock_1faa8.png"
    },
    {
      name: "Paper",
      img:
        "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/mozilla/36/memo_1f4dd.png"
    },
    {
      name: "Scissors",
      img: "https://images.emojiterra.com/twitter/512px/2702.png"
    }
  ];

	const allOptions = {
		Rock: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/271/rock_1faa8.png',
		Paper: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/mozilla/36/memo_1f4dd.png',
		Scissors: 'https://images.emojiterra.com/twitter/512px/2702.png'
	}

	const allTranslatedOptions = {
		Rock: 'Rock',
		Paper: 'Paper',
		Scissors: 'Scissors'
	}

  const handleLeftClick = () => {
    switch(option) {
      case 'Rock':
        setOption('Scissors')
        return;
      case 'Paper':
        setOption('Rock')
        return;
      case 'Scissors':
        setOption('Paper')
        return;
    }
  }

  const handleRightClick = () => {
    switch(option) {
      case 'Rock':
        return setOption('Paper');
      case 'Paper':
        setOption('Scissors')
        return;
      case 'Scissors':
        return setOption('Rock');
        return;
    }
  }

  const randomPicker = () => {
    const randNum = Math.floor(Math.random() * 3);
    return guesses[randNum];
  };

  const [userInput, changeUserInput] = useState({});
  const computerInput = randomPicker();

  const evaluate = () => {
    if (userInput.name === computerInput.name) {
      return "TIE";
    } else if (
      (userInput.name === guesses[0].name &&
        computerInput.name === guesses[2].name) ||
      (userInput.name === guesses[1].name &&
        computerInput.name === guesses[0].name) ||
      (userInput.name === guesses[2].name &&
        computerInput.name === guesses[1].name)
    ) {
      return "YOU WIN";
    } else if (
      (userInput.name === guesses[1].name &&
        computerInput.name === guesses[2].name) ||
      (userInput.name === guesses[2].name &&
        computerInput.name === guesses[0].name) ||
      (userInput.name === guesses[0].name &&
        computerInput.name === guesses[1].name)
    ) {
      return "YOU LOSE";
    }
  };

  return (
    <WholeContainer>
      <Row>
        <ArrowWrapper onClick={handleLeftClick}>
          <ArrowLeftIcon />
        </ArrowWrapper>
        <Space width={15}/>
        <Column>
          <RPSImg src={allOptions[option]} />
          <Space height={8} />
          <Text fontSize="24px" color={objectText}>{allTranslatedOptions[option]}</Text>
        </Column>
        <Space width={15}/>
        <ArrowWrapper onClick={handleRightClick}>
          <ArrowRightIcon />
        </ArrowWrapper>
      </Row>
      <Text color={objectText} fontFamily="MontSerrat" fontWeight={"black"} fontSize={"50px"} fontStyle="italic">VS.</Text>
      <Column>
        <RPSImg src={allOptions[pcOption]} />
        <Space height={8} />
        <Text fontSize="24px" color={objectText}>{allTranslatedOptions[pcOption]}</Text>
      </Column>
    </WholeContainer>
  );
}
