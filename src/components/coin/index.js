import React, { useState } from "react";
//import "./dice.css";
import constants from '../../utils/constants';
import styled from '@emotion/styled';

const { colors } = constants;
const { primaryBackground, secondaryBackground, accentColor, objectText } = colors;

const Tails = styled.div`
	background-size: contain !important;
`

const Coin = ({ isFlipping, isFlipped}) => {

	return (
    <>
			<div className="coinWrap">
			<div className={`coin ${isFlipped ? 'stopped-coin' : (isFlipping ? 'loading-coin' : 'flipping-coin')} ${isFlipped && textContent === 'HEADS' ? 'coin-head' : 'coin-tail'}`}>
				<div className="side heads"></div>
				<div className="side tails"></div>
			</div>
		</div>
	</>
	);
};
export default Coin;
