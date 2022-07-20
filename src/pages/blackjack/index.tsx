import React, { useState, useContext, useEffect } from 'react';
import { Layout } from '../../components/common/layout';
import { Box, useDisclosure } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';
import BlackjackComponent from '../../components/blackjack/index'
import { CurrencyContext } from '../_app';
import { sendCurrencyToTreasure, renderButtons } from '../../utils/solana'
import Space from '../../components/common/space'
import {
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled'
import constants from '../../utils/constants';
import axios from 'axios';
import { sendBetToBalance } from '../../utils/sendBetToBalance';
import { Button, ButtonsArea, Cards, Game, GameArea, Games, GamesWrapper, HouseArea, PlayerArea, Title } from './styles';
import { SignMessage } from '../../utils/SignMessage';
import bs58 from 'bs58'
import Card from '../../components/Card';

const { colors, infos } = constants;
const { secondaryBackground, accentColor, objectText } = colors;
const MotionBox = motion(Box);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  padding-top: 50px;
`


const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 10px;
  @media (max-width: 1250px) {
    height: 100%;
    flex-direction: column;
    padding-bottom: 40px;
  }
`

const BalanceArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 18px;

  span {
    font-size: 20px;
    font-weight: bold;
  }

`

export default function Blackjack() {
  const [isLoading, setLoading] = useState(false)
  const [isFlipped, setFlipped] = useState(false)
  const [inputValue, setValue] = useState()
  const [bets, setBets] = useState(0)
  const [diceValue, setDiceValue] = useState(0); // integer state
  const context = useContext(CurrencyContext)
  const [mySignature, setSignature] = useState(null)
  const [isPaymentVerified, setVerified] = useState(false)
  const [won, setWon] = useState()

  const { onOpen } = useDisclosure()
  const toast = useToast();
  const fromWallet = useAnchorWallet();
  const { connection } = useConnection();

  const [initialGames, setInitialGames] = useState([])
  const [house, setHouse] = useState([])
  const [gameList, setGameList] = useState([])
  const { connected, publicKey, signTransaction, signMessage } = useWallet()
  const [balance, setBalance] = useState(0)
  const [flyBalance, setFlyBalance] = useState(0)
  const [solBalance, setSolBalance] = useState(0)

  useEffect(() => {
    if (connected) {
      updateBalances()
    }
  }, [connected])

  async function handleNewGame(amount: number, tokenMint: string) {
    if (!connected) return
    const signature = await SignMessage({ publicKey, connected, signMessage })
    const body = {
      wallet: publicKey?.toString(),
      project: infos.project,
      amount,
      tokenMint,
      signature: bs58.encode(signature)
    }
    const { data } = await axios.post(`${infos.serverUrl}/blackJack/newblackjack`, body)
    setInitialGames(data.games)
    setHouse(data.house)
    const temp = data.games.map(({ gameId }: any) => gameId)
    setGameList(temp)
    updateBalances()
  }

  async function handleClick(id: string, param: string) {
    console.log('90', { id })
    const body = {
      gameId: id,
      wallet: publicKey?.toString(),
      gameList
    }
    const { data } = await axios.post(`${infos.serverUrl}/blackjack/${param}`, body)
    setInitialGames(data.games)
    setHouse(data.house)
    const temp = data.games.map(({ gameId }: any) => gameId)
    setGameList(temp)
    updateBalances()
  }

  function updateBalances() {
    const body = {
      project: infos.project,
      wallet: publicKey?.toString()
    }

    axios.post(`${infos.serverUrl}/balance`, body).then(({ data }) => {

      data.forEach(({ amount, tokenMint }) => {
        if (tokenMint === "11111111111111111111111111111111") {
          setSolBalance(amount)
        } else {
          setFlyBalance(amount)
        }
      })
    })
  }

  return (
    <Layout style={{
      background: "#121E30",
      // background: 'linear-gradient(0deg, rgba(141,0,233,1) 0%, rgba(255,0,110,1) 100%)'
    }}>
      <Wrapper>
        <InnerWrapper>
          <MotionBox
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
            sx={{ 
              width: {base: '300px', md:'600px'}, 
              overflow: 'hidden', 
              flex: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center', 
              backgroundColor: 'rgba(255, 255, 255, .25)', 
              padding: {base: '5px', md: 20}, 
              borderRadius: 4 
            }}
          >
            {connected && (
              <BalanceArea>
                <span>$SOL: {solBalance.toFixed(2)}</span>
                {/* <span>$TBF: {flyBalance.toFixed(2)}</span> */}
              </BalanceArea>
            )}
            <GamesWrapper>
              <GameArea>
                <HouseArea>
                  <Title>House</Title>
                  <Games>
                    {
                      house.cards && house?.cards.length > 0 && (
                        <Game>
                          <div>
                            <span>Points: {house.points}</span>
                          </div>
                          <Cards>
                            {
                              house.cards.map(({ rank, suit, weight }, index) => <Card rank={rank || weight} suit={suit} key={index} index={index} />)
                            }
                          </Cards>
                        </Game>
                      )
                    }
                  </Games>
                </HouseArea>

                <PlayerArea>
                  <Title>
                    Player
                  </Title>
                  <Games>
                    {
                      initialGames.map(({ gameId, cards, id, points, stand, allowSplit, double }, ind) => (
                        <Game key={gameId}>
                          <div>
                            <span>Points: {
                              cards.find(({ allowEleven }) => allowEleven)
                                ? `${cards.reduce((acc, att) => acc + att.weight, 0)} | ${cards.reduce((acc, att) => acc + att.weight, 0) + 10}`
                                : cards.reduce((acc, att) => acc + att.weight, 0) || points
                              // cards.reduce((acc, att) => acc + att.weight, 0) || points

                            }</span>
                            {/* {
                            cards.find(({ allowEleven }) => allowEleven)
                            && (
                              <SelectArea>
                                <OneSide onClick={() => oneSelect(1, id)}>
                                  {cards.reduce((acc, att) => acc + att.weight, 0)}
                                </OneSide>
                                <ElevenSide onClick={() => oneSelect(11, id)}>
                                  {cards.reduce((acc, att) => acc + att.weight, 0) + 10}
                                </ElevenSide>
                              </SelectArea>
                            )
                          } */}
                          </div>
                          <Cards>
                            {
                              cards.map(({ rank, suit, weight }, index) => <Card rank={rank || weight} suit={suit} key={index} index={index} />)
                            }
                          </Cards>
                          <ButtonsArea>
                            <Button
                              disabled={stand}
                              clickable={stand}
                              onClick={() => handleClick(gameId, 'hit')}
                            >
                              HIT
                            </Button>

                            <Button
                              disabled={stand}
                              clickable={stand}
                              onClick={() => handleClick(gameId, 'stand')}
                            >
                              STAND
                            </Button>
                            <Button
                              disabled={stand || double}
                              clickable={stand || double}
                              onClick={() => handleClick(gameId, 'double')}
                            >
                              DOUBLE
                            </Button>
                            <Button
                              disabled={!allowSplit || stand}
                              clickable={!allowSplit || stand}
                              onClick={() => handleClick(gameId, 'split')}>
                              SPLIT
                            </Button>
                          </ButtonsArea>
                        </Game>
                      ))
                    }

                  </Games>
                </PlayerArea>

              </GameArea>
            </GamesWrapper>
            <Space height={20} />
            {renderButtons(context.value, false, handleNewGame, inputValue, setValue, isLoading, onOpen)}
          </MotionBox>
        </InnerWrapper>
      </Wrapper>
    </Layout>
  );
}
