import React, { useState } from "react";
//import "./dice.css";
import constants from '../../utils/constants';
import styled from '@emotion/styled';

const { colors } = constants;
const { primaryBackground, secondaryBackground, accentColor, objectText } = colors;

const Tails = styled.div`
	background-size: contain !important;
`

const Coin = ({ isFlipping, isFlipped, rotate, diceValue, textContent}) => {

	return (
    <>
			<p style={{color: secondaryBackground}}>{diceValue}</p>
			<span style={{ color: objectText, fontSize: 24, marginBottom: 5 }}>{textContent}</span>
			<div className="coinWrap">
			<div className={`coin ${isFlipped ? 'stopped-coin' : isFlipping ? 'loading-coin' : 'flipping-coin'} ${textContent === 'HEADS' ? 'coin-head' : 'coin-tail'}`}>
				<div className="side heads"></div>
				<div className="side tails"></div>
			</div>
		</div>
	</>
	);
};
export default Coin;
