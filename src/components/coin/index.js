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

	const heads = <div className={`outcome ${isFlipping && 'toss'} ${isFlipped && 'flip'}`} style={{ background: "url('/images/front-coin.png')", backgroundSize: 'contain', borderColor: accentColor, color: objectText }} />
	const tails = <Tails className={`outcome ${isFlipping && 'toss'} ${isFlipped && 'flip'}`} style={{ background: "url('/images/back-coin.png')", backgroundSize: 'contain', borderColor: accentColor, color: objectText }} />

	return (
    <>
			<span style={{ color: objectText, fontSize: 24, marginBottom: 5 }}>{textContent}</span>
			{textContent === 'HEADS' ? heads : tails}
		</>
	);
};
export default Coin;
