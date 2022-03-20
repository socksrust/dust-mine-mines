import React, { useState } from "react";
import styled from '@emotion/styled'
import {
  Text,
} from '@chakra-ui/react';
import Space from "../common/space";
import constants from '../../utils/constants';

const { infos } = constants;

const WholeContainer = styled.div`
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Span = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: rgb(147, 250, 165);
`;

const SquareComponent = styled.div`
  width: 65px;
  height: 65px;
  background: ${p => !p.isPaymentVerified ? 'grey' : (p.won ? 'green' : (p.isExploded ? `rgba(255,0,0, ${1 * p.squareCount/20})` : 'white'))};
  border: 1px black solid;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Square = ({count, setCount, ...props}) => {
  const [exploded, setExploded] = useState(false)
  const [squareCount, setSquareCount] = useState(-20)

  const handleSquareClick = async () => {
    if(exploded === true || count === 80) {
      return;
    }

    const resp = await fetch(`${infos.serverUrl}/api/v1/transaction/mineBet`, {
      //const resp = await fetch(`${infos.serverUrl}/api/v1/transaction/${endpoint}`, {
        body: `{"transactionId":"${signature}", "r":"${r}"}`,
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
    });
  
    const parsedResult = await resp.json();

    setExploded(true)
    setSquareCount(count + 20)
    setCount(count + 20)


  }

  return (
    <SquareComponent {...props} won={count === 80} onClick={handleSquareClick} isExploded={exploded} squareCount={squareCount}>
      {20 + squareCount}%
    </SquareComponent>
  )
}

export default function MinComp({ isPaymentVerified }) {
  const [count, setCount] = useState(-20)
  return (
    <WholeContainer>
      <Text fontSize={"24px"} fontWeight={"bold"}>3 Bombs have been planted</Text>
      <Space height={10}/>
      <Text fontSize={"16px"}>Check 5 squares to win
        <Span> 100x</Span>
      </Text>
      <Space height={40}/>
      <Row>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified}/>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified}/>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
      </Row>
      <Row>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
      </Row>
      <Row>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
      </Row>
      <Row>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
      </Row>
      <Row>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
      </Row>
      <Row>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
      </Row>
      <Row>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} />
      </Row>
    </WholeContainer>
  );
}
