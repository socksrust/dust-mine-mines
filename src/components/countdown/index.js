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

//import "./dice.css";
const CountDown = ({ countDownDate }) => {
	const [text, setText] = useState(' ')
  const { isOpen, onOpen, onClose } = useDisclosure()

	var x = setInterval(function() {

		// Get today's date and time
		var now = new Date().getTime();

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

		// If the count down is finished, write some text
		if (distance < 0) {
			clearInterval(x);
			setText("EXPIRED")
		}
	}, 1000);

	return (
		<Row>
			<Text fontSize="48px" fontWeight="bold">
				{text}
			</Text>
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
