import React, { useEffect, useState } from "react";
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
  background: ${p => !p.isPaymentVerified ? 'grey' : (p.won ? 'green' : (p.isExploded ? `rgba(255,0,0,1)` : 'white'))};
  border: 1px black solid;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const INITIAL_STATE = [
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false,
]

const Square = ({mySignature, setVerified, setSignature, explode, exploded, ...props}) => {
  const [bomb, setBomb] = useState(false)
  const toast = useToast();

  const handleSquareClick = async () => {
    console.log('====1====')
    if(exploded === true) {
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


    explode()
    console.log('====5====')

  }

  return (
    <SquareComponent {...props} exploded={exploded} onClick={async () => handleSquareClick()} isExploded={exploded}>
      {exploded ? '⭐' : ''}
    </SquareComponent>
  )
}

export default function MinComp(props) {
  const [exploded, setExploded] = useState(INITIAL_STATE)
  
  useEffect(() => {
    if(props.mySignature === null) {
      setExploded(INITIAL_STATE)
    }
  }, [props.mySignature])

  const explode = (index) => {
    const explodedShadow = [...exploded];
    explodedShadow[index] = true;
    setExploded(explodedShadow);
  }



  return (
    <WholeContainer>
      <Text fontSize={"24px"} fontWeight={"bold"}>3 Bombs have been planted</Text>
      <Space height={10}/>
      <Text fontSize={"16px"}>Check 5 squares to win
        <Span> 100x</Span>
      </Text>
      <Space height={40}/>
      <Row>
        <Square {...props} exploded={exploded[0]} explode={() => explode(0)} />
        <Square {...props} exploded={exploded[1]} explode={() => explode(1)} />
        <Square {...props} exploded={exploded[2]} explode={() => explode(2)}  />
        <Square {...props} exploded={exploded[3]} explode={() => explode(3)}  />
        <Square {...props} exploded={exploded[4]} explode={() => explode(4)}  />
        <Square {...props} exploded={exploded[5]} explode={() => explode(5)}  />
        <Square {...props} exploded={exploded[6]} explode={() => explode(6)}  />
        <Square {...props} exploded={exploded[7]} explode={() => explode(7)}  />
      </Row>
      <Row>
        <Square {...props} exploded={exploded[8]} explode={() => explode(8)}  />
        <Square {...props} exploded={exploded[9]} explode={() => explode(9)}  />
        <Square {...props} exploded={exploded[10]} explode={() => explode(10)}  />
        <Square {...props} exploded={exploded[11]} explode={() => explode(11)}  />
        <Square {...props} exploded={exploded[12]} explode={() => explode(12)}  />
        <Square {...props} exploded={exploded[13]} explode={() => explode(13)}  />
        <Square {...props} exploded={exploded[14]} explode={() => explode(14)}  />
        <Square {...props} exploded={exploded[15]} explode={() => explode(15)}  />
      </Row>
      <Row>
        <Square {...props} exploded={exploded[16]} explode={() => explode(16)}  />
        <Square {...props} exploded={exploded[17]} explode={() => explode(17)}  />
        <Square {...props} exploded={exploded[18]} explode={() => explode(18)}  />
        <Square {...props} exploded={exploded[19]} explode={() => explode(19)}  />
        <Square {...props} exploded={exploded[20]} explode={() => explode(20)}  />
        <Square {...props} exploded={exploded[21]} explode={() => explode(21)}  />
        <Square {...props} exploded={exploded[22]} explode={() => explode(22)}  />
        <Square {...props} exploded={exploded[23]} explode={() => explode(23)}  />
      </Row>
      <Row>
        <Square {...props} exploded={exploded[24]} explode={() => explode(24)}  />
        <Square {...props} exploded={exploded[25]} explode={() => explode(25)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
      </Row>
      <Row>
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
      </Row>
      <Row>
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
      </Row>
      <Row>
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
        <Square {...props} exploded={exploded} explode={() => explode(0)}  />
      </Row>
    </WholeContainer>
  );
}
