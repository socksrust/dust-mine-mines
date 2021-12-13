import React, { useState } from "react";
import styled from '@emotion/styled'
import Space from '../common/space'

import { Text, useToast, Input, Button, Switch, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, useDisclosure, ModalFooter } from '@chakra-ui/react';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

Date.prototype.addHours = function(h){
	this.setHours(this.getHours()+h);
	return this;
}

//import "./dice.css";
const CountDown = ({ countDownDate }) => {
	const [text, setText] = useState(' ')
	const [multiplier, setMultiplier] = useState(' ')
  const { isOpen, onOpen, onClose } = useDisclosure()

	var x = setInterval(function() {

		// Get today's date and time
		var now = new Date().getTime();

		while(countDownDate <= now) {
			countDownDate.addHours(24)
		}


		// Find the distance between now and the count down date
		var distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Display the result in the element with id="demo"
		const newText = days + "d " + hours + "h "
		+ minutes + "m " + seconds + "s ";
		setText(newText)



		let multi = 0;
		if(minutes <= 9) {
			multi = (Number(`${hours}0${minutes}0`))
		} else {
			multi = (Number(`${hours}${minutes}0`))
		}

		const final = multi**2

		setMultiplier(final.toLocaleString(undefined))

		// If the count down is finished, write some text
		if (distance < 0) {
			clearInterval(x);
			setText("EXPIRED")
		}
	}, 1000);

	return (
		<Row>
			<Column>
				<Text fontSize="48px" fontWeight="bold">
					{text}
				</Text>
				<Text fontSize="26px" fontWeight="bold" marginTop={0} color="rgba(80, 227, 194, 1)">
					Multiplier: {multiplier && multiplier}x
				</Text>
			</Column>
			<Space width={20} />
			<Button borderRadius="2rem" width="120px" height="36px" borderColor="#fff" onClick={onOpen}>
				<Text fontSize="14px" fontWeight="bold" color="#000">Read rules</Text>
			</Button>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton color="#000" />
					<ModalHeader>
						<Text fontSize="24px" fontWeight="bold" color="#02011F">
							Race rules:
						</Text>
					</ModalHeader>
					<ModalBody paddingTop="0px">
						<Text fontSize="16px" fontWeight="normal" color="#02011F">
							- Only $SOL bets are allowed
						</Text>
						<Text fontSize="16px" fontWeight="normal" color="#02011F">
							- Every race bet goes to the Jackpot
						</Text>
						<Text fontSize="16px" fontWeight="normal" color="#02011F">
							- Only 1, 2 and 3rd position receive a prize
						</Text>
						<Text fontSize="16px" fontWeight="normal" color="#02011F">
							- 10% of current jackpot accumulates to next day
						</Text>
						<Text fontSize="16px" fontWeight="normal" color="#02011F">
							- Every race takes 24h
						</Text>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Row>
	);
};
export default CountDown;
