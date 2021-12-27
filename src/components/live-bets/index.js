import React, { useEffect, useRef, useState } from 'react';

import {
  Text,
} from '@chakra-ui/react';
import styled from '@emotion/styled'
import { motion } from "framer-motion";

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
  padding: 10px;
`

const TransactionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-top: 3px;
  padding: 14px 0px;
  border-bottom-width: 0.4px;
  border-bottom-color: rgba(255,255,255,0.1);
`

const GameWrappper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: medium;
  font-size: 24px;
  
`

const BetvaueWrappper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: medium;
  font-size: 24px;

`

const CreatedWrappper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: medium;
  font-size: 24px;
  
`

const Transaction = ({betValue, createdAt, won, game, isOutline, currency}) => (
  <TransactionWrapper isOutline={isOutline}>
    <GameWrappper>
      <Text fontWeight="normal" fontSize="20px" >{game}</Text>
    </GameWrappper>
    <BetvaueWrappper>
      <Text fontWeight="normal" fontSize="20px" color={won ? '#00E676' : '#F44336'}>{betValue} ${currency}</Text>
    </BetvaueWrappper>
    <CreatedWrappper>
      <Text fontWeight="normal" fontSize="20px" >{timeSince(createdAt)} ago</Text>
    </CreatedWrappper>
  </TransactionWrapper>
)


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  width: 100%;
  overflow: scroll;
  z-index: 3;
  border: 1px solid #20252F;
`

export default function LiveBets() {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const resp = await fetch("http://localhost:3009/api/v1/transaction/coinTransactions", {
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
        <Row style={{ paddingTop: 20 } }>
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
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, delay: 0.35  }}
          >
        {transactions && transactions[0] && transactions.map((transaction, index) => (
          <Transaction {...transaction} isOutline={index % 2 === 0} />
        ))}
        </motion.div>
      </Wrapper>
  );
}
