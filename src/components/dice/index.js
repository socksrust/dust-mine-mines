import React, { useState } from "react";
//import "./dice.css";
import constants from '../../utils/constants';

const { colors } = constants;
const { secondaryBackground } = colors;

const Dice = ({ isRolling, rotate, diceValue}) => {


	return (
    <>
    <p style={{color: secondaryBackground}}>{diceValue}</p>
		<div className="scene dim mt2 mb4 " >
			<div className="cube" style={{ transform: rotate, transition: `transform ${isRolling ? '10000s' : '0s'}` }}>
				<div className="bg-white cube__face cube__face--front front">
				</div>
				<div className="bg-white cube__face cube__face--back back">
				</div>
				<div className=" bg-white cube__face cube__face--right right">
				</div>
				<div className=" bg-white cube__face cube__face--left left">
				</div>
				<div className="bg-white cube__face cube__face--top top">
				</div>
				<div className=" bg-white cube__face cube__face--bottom bottom">
				</div>
			</div>
		</div>
    </>
	);
};
export default Dice;
