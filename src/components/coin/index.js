import React, { useState } from "react";
//import "./dice.css";
const Coin = ({ isFlipping, isFlipped, rotate, diceValue, textContent}) => {

	return (
    <>
			<div className={`outcome ${isFlipping && 'toss'} ${isFlipped && 'flip'}`}>
				{textContent}
			</div>
		</>
	);
};
export default Coin;
