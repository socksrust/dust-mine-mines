import React, { useState } from "react";
import styled from '@emotion/styled'
import {
  Text,
} from '@chakra-ui/react';
import Space from '../common/space'
import Carousel from './carousel'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

const WholeContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 910px;
`;


const RPSImg = styled.img`
  width: 190px;
  border-radius: 50%;
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
  background: #5D5FEF;
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
        "https://images.emojiterra.com/google/android-11/512px/1faa8.png"
    },
    {
      name: "Paper",
      img:
        "https://img2.gratispng.com/20180723/pus/kisspng-guess-the-emoji-paper-emoji-answers-android-nougat-30-days-5b5636cbd769a6.6662791615323767798824.jpg"
    },
    {
      name: "Scissors",
      img: "data:image/png;base64,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"
    }
  ];

	const allOptions = {
		Rock: '/images/husky.jpeg',
		Paper: '/images/shiba.jpeg',
		Scissors: '/images/frenchie.jpeg'
	}

	const allTranslatedOptions = {
		Rock: 'Husky',
		Paper: 'Shiba',
		Scissors: 'Frenchie'
	}

  const handleLeftClick = () => {
    switch(option) {
      case 'Rock':
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
          <Text fontSize="24px">{allTranslatedOptions[option]}</Text>
        </Column>
        <Space width={15}/>
        <ArrowWrapper onClick={handleRightClick}>
          <ArrowRightIcon />
        </ArrowWrapper>
      </Row>
      <Text color="#FFA33A" fontFamily="MontSerrat" fontWeight={"black"} fontSize={"50px"} fontStyle="italic">VS.</Text>
        <Column>
          <RPSImg src={allOptions[pcOption]} />
          <Space height={8} />
          <Text fontSize="24px">{allTranslatedOptions[pcOption]}</Text>
        </Column>
      {/*<WinnerText>{evaluate()}</WinnerText>*/}
    </WholeContainer>
  );
}
