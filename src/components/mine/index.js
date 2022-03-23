import React, { useState } from "react";
import styled from '@emotion/styled'
import {
  Text,
  useToast
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

const Square = ({count, setCount, mySignature, setVerified, setSignature, ...props}) => {
  const [exploded, setExploded] = useState(false)
  const [squareCount, setSquareCount] = useState(-20)
  const [bomb, setBomb] = useState(false)
  const toast = useToast();

  const handleSquareClick = async () => {
    console.log('====1====')
    if(exploded === true || count === 80) {
      return;
    }
    console.log('====2====')

    const resp = await fetch(`${infos.serverUrl}/api/v1/transaction/mineBet`, {
      //const resp = await fetch(`${infos.serverUrl}/api/v1/transaction/${endpoint}`, {
        body: `{"transactionId":"${mySignature}"}`,
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
    });
    console.log('====3====')
  
    const parsedResult = await resp.json();
    console.log('====4====')
    console.log('parsedResult', parsedResult);
    if(parsedResult?.data?.message) {
      return toast({
        title: `Message`,
        description: parsedResult?.data?.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        variant: 'solid'
      });
    } else if (parsedResult?.data?.won === false) {
      setSignature(null);
      setVerified(false);
      setBomb(true)
      setCount(-20);
      return toast({
        title: `Boom!!`,
        description: 'The bomb exploded!! Try again!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        variant: 'solid'
      });
    }


    setExploded(true)
    setSquareCount(count + 20)
    setCount(count + 20)
    console.log('====5====')

  }

  return (
    <SquareComponent {...props} won={count === 80} onClick={async () => handleSquareClick()} isExploded={exploded} squareCount={squareCount}>
      {20 + squareCount}%
    </SquareComponent>
  )
}

export default function MinComp({ isPaymentVerified, mySignature, setVerified, setSignature }) {
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
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature} />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
      </Row>
      <Row>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
      </Row>
      <Row>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
      </Row>
      <Row>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
      </Row>
      <Row>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
      </Row>
      <Row>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
      </Row>
      <Row>
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
        <Square count={count} setCount={setCount} isPaymentVerified={isPaymentVerified} mySignature={mySignature} setVerified={setVerified} setSignature={setSignature}  />
      </Row>
    </WholeContainer>
  );
}
