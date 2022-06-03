/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { CurrencyContext as Teste } from '../../pages/_app';
import {
  AmountArea,
  AmountButton,
  Area,
  BetButton,
  Container,
  Content,
  GameArea,
  Image,
  ImageAbsolute,
  Item,
  Menu,
  RouletteCenter,
  Title,
} from './styles'
import { v4 as uuid } from 'uuid'
// import Layout from 'components/Layout'
import { useWallet } from '@solana/wallet-adapter-react'
import Card from 'components/Card'
import Connect from 'components/Connect'
import Table from './table'
import { BetsContext } from '../../contexts/RouletteProvider'
import BetList from '../../components/BetList'
import { CurrencyContext } from '../../contexts/CurrencyProvider'
import axios from 'axios'
import Link from 'next/link'
import { Layout } from '../../components/common/layout';
const Wheel = dynamic(
  () => import('react-custom-roulette').then(mod => mod.Wheel),
  { ssr: false }
)

import constants from '../../utils/constants';
import { SignMessage } from '../../utils/SignMessage';
import bs58 from 'bs58'
import { useToast } from '@chakra-ui/react';

const { colors, infos, objects: { coins } } = constants;

export default function Home() {
  const { connected, publicKey, signTransaction, signMessage } = useWallet()
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [betLocked, setBetLocked] = useState(false)
  const { bets, updateBets, clearBets, setBetValue, currentValue } = useContext(BetsContext)
  const { currentCurrency, currentValues, updateCurrency } = useContext(CurrencyContext)
  const [won, setWon] = useState([])
  const context = useContext(Teste)
  const [balances, setBalances] = useState([])
  const toast = useToast();
  const project = 'sss'

  const data = [
    { option: 0, style: { backgroundColor: '#17BF68' } },
    { option: 32, style: { backgroundColor: '#C90022' } },
    { option: 15, style: { backgroundColor: '#25222B' } },
    { option: 19, style: { backgroundColor: '#C90022' } },
    { option: 4, style: { backgroundColor: '#25222B' } },
    { option: 21, style: { backgroundColor: '#C90022' } },
    { option: 2, style: { backgroundColor: '#25222B' } },
    { option: 25, style: { backgroundColor: '#C90022' } },
    { option: 17, style: { backgroundColor: '#25222B' } },
    { option: 34, style: { backgroundColor: '#C90022' } },
    { option: 6, style: { backgroundColor: '#25222B' } },
    { option: 27, style: { backgroundColor: '#C90022' } },
    { option: 13, style: { backgroundColor: '#25222B' } },
    { option: 36, style: { backgroundColor: '#C90022' } },
    { option: 11, style: { backgroundColor: '#25222B' } },
    { option: 30, style: { backgroundColor: '#C90022' } },
    { option: 8, style: { backgroundColor: '#25222B' } },
    { option: 23, style: { backgroundColor: '#C90022' } },
    { option: 10, style: { backgroundColor: '#25222B' } },
    { option: 5, style: { backgroundColor: '#C90022' } },
    { option: 24, style: { backgroundColor: '#25222B' } },
    { option: 16, style: { backgroundColor: '#C90022' } },
    { option: 33, style: { backgroundColor: '#25222B' } },
    { option: 1, style: { backgroundColor: '#C90022' } },
    { option: 20, style: { backgroundColor: '#25222B' } },
    { option: 14, style: { backgroundColor: '#C90022' } },
    { option: 31, style: { backgroundColor: '#25222B' } },
    { option: 9, style: { backgroundColor: '#C90022' } },
    { option: 22, style: { backgroundColor: '#25222B' } },
    { option: 18, style: { backgroundColor: '#C90022' } },
    { option: 29, style: { backgroundColor: '#25222B' } },
    { option: 7, style: { backgroundColor: '#C90022' } },
    { option: 28, style: { backgroundColor: '#25222B' } },
    { option: 12, style: { backgroundColor: '#C90022' } },
    { option: 35, style: { backgroundColor: '#25222B' } },
    { option: 3, style: { backgroundColor: '#C90022' } },
    { option: 26, style: { backgroundColor: '#25222B' } }
  ]

  const backgroundColors = ['#ff8f43', '#70bbe0', '#0b3351', '#f9dd50']
  const textColors = ['#FFF']
  const outerBorderColor = '#eeeeee'
  const outerBorderWidth = 0
  const innerBorderColor = '#1d1222'
  const innerBorderWidth = 160
  const innerRadius = 0
  const radiusLineColor = '#eeeeee'
  const radiusLineWidth = 0
  const fontSize = 20
  const textDistance = 86
  const spinDuration = 0.5

  useEffect(() => {
    if (connected) {
      updateBalances()
    }
  }, [connected])

  useEffect(() => {
    updateCurrency(context.value)
  }, [context.value])

  async function SendBet() {
    try {
      if (betLocked || bets.length === 0) return
      const signature = await SignMessage({ publicKey, connected, signMessage })
      if (!signature) {
        toast({
          title: `Oops.`,
          description: 'You need to connect your wallet before!',
          status: 'warning',
          duration: 10000,
          isClosable: true,
          position: 'top-right',
          variant: 'solid'
        });
      }
      const betsBody = bets.map(({ tokenMint, value, type, option }) => {
        const obj = {
          amount: value,
          bet: typeof (option) === 'number' ? option : -1,
          type,
          project,
          tokenMint,
          wallet: publicKey?.toString()
        }
        return obj
      })
      const body = {
        bets: betsBody,
        signature: bs58.encode(signature),
        wallet: publicKey?.toString()
      }
      setBetLocked(true)
      const { data: response } = await axios.post('https://new-back-games.herokuapp.com/459d6b3e8eeff11dc7d7f09c24b09d7037b085cdac5e2d868c9a47154120cf21', body)
      setWon(response.totalWon)
      let ind = 0
      data.forEach(({ option }, index) => {
        if (Number(option) === response.sorted) {
          ind = index
        }
      })
      setPrizeNumber(ind)
      setMustSpin(true)

      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    } catch (error) {
      setBetLocked(false)
    }
  }

  function updateBalances() {
    const body = {
      project: infos.project,
      wallet: publicKey?.toString(),
    }

    axios.post(`${infos.serverUrl}/balance`, body).then(({ data }) => {
      const balances: any = coins.map(({ label, mintAddress }) => {
        const temp: any = {}
        const finder = data.find(({ tokenMint }) => tokenMint === mintAddress)
        temp.mintAddress = mintAddress
        temp.label = label
        if (finder) {
          temp.amount = finder.amount
        } else {
          temp.amount = 0
        }
        return temp
      })
      setBalances(balances)
    })
  }

  function Toast() {
    updateBalances()
    const tokens = {
      '11111111111111111111111111111111': 'SOL',
      'DMC8y7kpeBYfkbM3MmLREKeSGnw1sdWSv68aDUfH97Bu': 'DMC',
    }
    if (Object.keys(won).length === 0) {
      toast({
        title: `Oops.`,
        description: 'Naut a lucky flip, Try again!',
        status: 'warning',
        duration: 10000,
        isClosable: true,
        position: 'top-left',
        variant: 'solid'
      });
    } else {
      const list = Object.keys(won).map((key) => `${won[key].amount.toFixed(2)}${tokens[key]}`)
      toast({
        title: `Yayyyy!!`,
        description: `You got ${list.join(' and ')} back! They will be transferred in less than a minute! Keep going!!`,
        status: 'info',
        duration: 15000,
        isClosable: true,
        position: 'top-left',
        variant: 'solid'
      });
    }
  }

  return (
    <Layout style={{ 
      background: 'rgb(141,0,233)',
      background: 'linear-gradient(0deg, rgba(141,0,233,1) 0%, rgba(255,0,110,1) 100%)'
     }}>
      <Container>
        <Content>
          <AmountArea>
            <Title>
              ROULETTE
            </Title>

            {
              currentValues.map((amount, index) => (
                <AmountButton
                  key={index}
                  active={currentValue === amount}
                  onClick={() => setBetValue(amount)}
                >
                  {amount >= 1 ? amount : amount.toFixed(2)} ${currentCurrency}
                </AmountButton>
              ))
            }

            <BetList />
            <BetButton onClick={SendBet}>
              {
                betLocked ? <Image src='/img/loading.svg' /> : 'BET'
              }
            </BetButton>

          </AmountArea>
          <Area>
            <GameArea>
              <RouletteCenter src='https://i.imgur.com/WhUvzPV.png' />
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                backgroundColors={backgroundColors}
                textColors={textColors}
                fontSize={fontSize}
                outerBorderColor={outerBorderColor}
                outerBorderWidth={outerBorderWidth}
                innerRadius={innerRadius}
                innerBorderColor={innerBorderColor}
                innerBorderWidth={innerBorderWidth}
                radiusLineColor={radiusLineColor}
                radiusLineWidth={radiusLineWidth}
                spinDuration={spinDuration}
                perpendicularText
                textDistance={textDistance}
                onStopSpinning={() => {
                  setMustSpin(false)
                  setBetLocked(false)
                  Toast()
                }}
              />
            </GameArea>
            <Table />
          </Area>
        </Content>
      </Container>
    </Layout>
  )
}
