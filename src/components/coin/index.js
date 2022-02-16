import React, { useState } from "react";
//import "./dice.css";
import constants from '../../utils/constants';

const { colors } = constants;
const { primaryBackground, secondaryBackground, accentColor } = colors;


const Coin = ({ isFlipping, isFlipped, rotate, diceValue, textContent}) => {

	return (
    <>
			<div className={`outcome ${isFlipping && 'toss'} ${isFlipped && 'flip'}`} style={{ backgroundColor: accentColor, borderColor: accentColor, color: primaryBackground }}>
				{textContent}
			</div>
		</>
	);
};
export default Coin;
