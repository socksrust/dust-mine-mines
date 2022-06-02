import React, { useState } from "react";
//import "./dice.css";
import constants from '../../utils/constants';
import styled from '@emotion/styled';
import {
  Text,
} from '@chakra-ui/react';
const { colors } = constants;
const { primaryBackground, secondaryBackground, accentColor, objectText } = colors;

const Tails = styled.div`
	background-size: contain !important;
`

const Coin = ({ isFlipping, isFlipped, textContent}) => {

	return (
    <>
			<div className="coinWrap">
			<div className={`coin ${isFlipped ? 'stopped-coin' : (isFlipping ? 'loading-coin' : 'flipping-coin')} ${isFlipped && textContent === 'HEADS' && 'coin-head'} ${isFlipped && textContent === 'TAILS' && 'coin-tail'}`}>
				<div className="side heads">
					<Text fontSize="36px" fontWeight="bold" color={objectText}>HEADS</Text>
					{/* <img className="image" src="https://i.imgur.com/Zaz4Bo7.png" /> */}
				</div>
				<div className="side tails">
					<Text fontSize="36px" fontWeight="bold" color={objectText}>TAILS</Text>
					{/* <img className="image" src="https://i.imgur.com/5xI6IMy.png" /> */}
				</div>
			</div>
		</div>
	</>
	);
};
export default Coin;
