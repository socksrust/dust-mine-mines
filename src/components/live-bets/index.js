import React, { useEffect, useRef, useState } from 'react';

import {
  Text,
} from '@chakra-ui/react';
import styled from '@emotion/styled'

export function timeSince(date) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years'
  }
  interval = seconds / 259200
  if (interval > 1) {
    return Math.floor(interval) + ' months'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutes'
  }
  return Math.floor(seconds) + ' seconds'
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`

const TransactionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: ${p => p.won ? '#2ecc71' : '#e74c3c'};
  margin-top: 3px;
  padding: 10px 0px;
  border-radius: 4px;
`

const GameWrappper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const BetvaueWrappper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const CreatedWrappper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Transaction = ({betValue, createdAt, won, game}) => (
  <TransactionWrapper won={won}>
    <GameWrappper>
      <Text fontSize="24px" fontWeight="500">{game}</Text>
    </GameWrappper>
    <BetvaueWrappper>
      <Text fontSize="24px" fontWeight="500">{betValue}</Text>
    </BetvaueWrappper>
    <CreatedWrappper>
      <Text fontSize="24px" fontWeight="500">{timeSince(createdAt)} ago</Text>
    </CreatedWrappper>
  </TransactionWrapper>
)


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`


export default function LiveBets() {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const resp = await fetch("https://bip-gamex.herokuapp.com/api/v1/transaction/transactions", {
        headers: {
          "Content-Type": "application/json"
        },
      });
      const parsedResult = await resp.json();
      if(!transactions) {
        setTransactions(parsedResult?.data)
      }
    }

    fetchTransactions()
  }, [])

  /*useEffect(() => {
    const fetchTransactions = async () => {
      const resp = await fetch("https://bip-gamex.herokuapp.com/api/v1/transaction/transactions", {
        headers: {
          "Content-Type": "application/json"
        },
      });
      const parsedResult = await resp.json();
      const one = transactions && transactions[0] && transactions[0].createdAt;
      const two = parsedResult && parsedResult.data && parsedResult.data[0] && parsedResult.data[0].createdAt;
      if(one !==  two) {
        setTransactions(parsedResult?.data)
      }
      setTimeout(() => fetchTransactions(), 10000)
    }

    fetchTransactions()
  }, [])*/


  return (
      <Wrapper>
        <Text fontSize="24px" fontWeight="500" paddingBottom="20px">Live bets 🔥</Text>
        <Row>
          <GameWrappper>
            Game
          </GameWrappper>
          <BetvaueWrappper>
            Bet value
          </BetvaueWrappper>
          <CreatedWrappper>
            Time ago
          </CreatedWrappper>
        </Row>
        {transactions && transactions[0] && transactions.map(transaction => (
          <Transaction {...transaction}/>
        ))}
      </Wrapper>
  );
}
