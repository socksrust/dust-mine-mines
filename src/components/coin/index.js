import React, { useState } from "react";
//import "./dice.css";
import constants from '../../utils/constants';

const { colors } = constants;
const { primaryBackground, secondaryBackground, accentColor, objectText } = colors;


const Coin = ({ isFlipping, isFlipped, rotate, diceValue, textContent}) => {

	return (
    <>
			<span style={{ color: objectText, fontSize: 24, marginBottom: 5 }}>{textContent}</span>
			<div className={`outcome ${isFlipping && 'toss'} ${isFlipped && 'flip'}`} style={{ background: "url('/images/front-coin.png')", backgroundSize: 'contain', borderColor: accentColor, color: objectText }}>
			</div>
		</>
	);
};
export default Coin;
