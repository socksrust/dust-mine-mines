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
  background-color: ${p => p.isOutline ? '#0202204f' : 'transparent'};
  margin-top: 3px;
  padding: 14px 0px;
  width: 1000px;
`

const GameWrappper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: rgba(135, 134, 171, 0.8);
  font-weight: medium;
  font-size: 18px;
`

const BetvaueWrappper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: rgba(135, 134, 171, 0.8);
  font-weight: medium;
  font-size: 18px;
`

const MultiplierWrappper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0.5;
  align-items: center;
  justify-content: center;
  color: rgba(135, 134, 171, 0.8);
  font-weight: medium;
  font-size: 18px;
`

const CreatedWrappper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: rgba(135, 134, 171, 0.8);
  font-weight: medium;
  font-size: 18px;
`

function start_and_end(str) {
  if(!str) {
    return null;
  }

  if (str.length > 10) {
    return str.substr(0, 4) + '...' + str.substr(str.length-4, str.length);
  }
  return str;
}


const getPositionText = (position) => {
  switch(position) {
    case 1:
      return `1st place 👑 `
    case 2:
      return '2nd place 🥈'
    case 3:
      return '3rd place 🥉'
    default:
      return 'Losing...'
  }
}

const getPositionInfo = (position) => {
  switch(position) {
    case 1:
      return `(80% of JackPot)`
    case 2:
      return '(4% of JackPot)'
    case 3:
      return '(1% of JackPot)'
    default:
      return null
  }
}

const getPositionFontWeight = (position) => {
  switch(position) {
    case 1:
      return `bold`
    case 2:
      return 'medium'
    case 3:
      return 'normal'
    default:
      return 'normal'
  }
}

const getPositionFontSize = (position) => {
  switch(position) {
    case 1:
      return `24px`
    case 2:
      return '18px'
    case 3:
      return '16px'
    default:
      return '16px'
  }
}

const getPositionColor = (position) => {
  switch(position) {
    case 1:
      return `rgba(80, 227, 194, 1)`
    case 2:
      return 'rgba(80, 227, 194, 0.8)'
    case 3:
      return 'rgba(80, 227, 194, 0.4)'
    default:
      return '#ff0000'
  }
}

const Transaction = ({betValue, createdAt, won, game, fromWallet, isOutline, currency, position, racePoints, multiplier}) => (
  <TransactionWrapper isOutline={isOutline}>
    <GameWrappper>
      <Text color={getPositionColor(position)} fontSize={getPositionFontSize(position)} fontWeight={getPositionFontWeight(position)}>{getPositionText(position)}</Text>
      <Text fontSize="16px" >{getPositionInfo(position)}</Text>
    </GameWrappper>
    <BetvaueWrappper>
      <Text fontSize="16px" color={getPositionColor(position)}>{racePoints && racePoints.toLocaleString(undefined)} POINTS</Text>
    </BetvaueWrappper>
    <MultiplierWrappper>
      <Text fontSize="16px" color={getPositionColor(position)}>{multiplier && multiplier.toLocaleString(undefined)}</Text>
    </MultiplierWrappper>
    <BetvaueWrappper>
      <Text fontSize="16px" color={getPositionColor(position)}>{betValue} ${currency}</Text>
    </BetvaueWrappper>
    <CreatedWrappper>
      <Text fontSize="16px" >{timeSince(createdAt)} ago</Text>
    </CreatedWrappper>
    <CreatedWrappper>
      <Text fontSize="16px" >{fromWallet ? start_and_end(fromWallet) : 'Loading...'}</Text>
    </CreatedWrappper>
  </TransactionWrapper>
)


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: linear-gradient(210.96deg, rgba(36, 33, 81, 0.74) 0.01%, rgba(38, 35, 83, 0.78) 42.05%, rgba(47, 45, 97, 0.51) 104.81%);
  box-shadow: -23.609px 48.8461px 73.2692px rgba(23, 18, 43, 0.55);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  width: 900px
  min-height: 600px;
  overflow: scroll;
  z-index: 3;
`

export default function LiveBets() {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const resp = await fetch("https://bip-gamextwo.herokuapp.com/api/v1/transaction/raceTransactions", {
      //const resp = await fetch(`https://bip-gamextwo.herokuapp.com/api/v1/transaction/raceTransactions`, {
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

  useEffect(() => {
    const fetchTransactions = async () => {
      const resp = await fetch("https://bip-gamextwo.herokuapp.com/api/v1/transaction/raceTransactions", {
      //const resp = await fetch(`https://bip-gamextwo.herokuapp.com/api/v1/transaction/raceTransactions`, {
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
      setTimeout(() => fetchTransactions(), 1000)
    }

    fetchTransactions()
  }, [])


  return (
      <Wrapper>
        <Row>
          <GameWrappper>
            Position
          </GameWrappper>
          <BetvaueWrappper>
            Points
          </BetvaueWrappper>
          <MultiplierWrappper>
            Multiplier
          </MultiplierWrappper>
          <BetvaueWrappper>
            Bet value
          </BetvaueWrappper>
          <CreatedWrappper>
            Time ago
          </CreatedWrappper>
          <CreatedWrappper>
            Wallet
          </CreatedWrappper>
        </Row>
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, delay: 0.35  }}
          >
        {transactions && transactions[0] && transactions.map((transaction, index) => (
          <Transaction {...transaction} isOutline={index % 2 === 0} position={index+1} />
        ))}
        </motion.div>
      </Wrapper>
  );
}
