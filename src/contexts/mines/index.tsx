import { useDisclosure } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useContext, useState } from "react";
import { Layout } from "../../components/common/layout";
import { SignMessage } from "../../utils/SignMessage";
import { renderButtons } from "../../utils/solana";
import { CurrencyContext } from "../../pages/_app";
import {
  Area,
  BetsArea,
  GameArea,
  Game,
  Input,
  Label,
  Select,
  BetButton,
  Line,
  Mine
} from './styles'
import constants from '../../utils/constants';
import bs58 from 'bs58'
import axios from "axios";

const { colors, infos, objects: { coins } } = constants;
const Lines = [1, 2, 3, 4, 5]

export default function Mines() {
  const context = useContext(CurrencyContext)
  const [inputValue, setValue] = useState(1)
  const [selectCount, setSelectCount] = useState(1)
  const [gameId, setGameId] = useState()
  const [game, setGame] = useState([])

  const { connected, publicKey, signTransaction, signMessage } = useWallet()
  const [isLoading, setLoading] = useState(false)
  const { onOpen } = useDisclosure()
  async function handleNewGame() {
    if (!connected) return
    const signature = await SignMessage({ publicKey, connected, signMessage })
    const tokenMint = coins.find(({ value }) => value === context.value)
    if (!tokenMint) return
    console.log(tokenMint.mintAddress)

    const body = {
      wallet: publicKey?.toString(),
      project: infos.project,
      amount: inputValue,
      tokenMint: tokenMint.mintAddress,
      signature: bs58.encode(signature),
      totalMines: selectCount
    }

    const { data } = await axios.post('http://localhost:3000/mines/newgame', body)
    setGameId(data.gameId)
    console.log(data.mines)
    setGame(data.mines)
  }

  async function gameClick(line: number, position: number) {
    console.log({ line, position })
  }

  return (
    <Layout>
      <Area>
        <GameArea>
          <BetsArea>
            <Label>
              <span>Amount</span>
              <Input />
            </Label>

            <Label>
              <span>Mines</span>
              <Select size={selectCount}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
              </Select>
            </Label>
            <BetButton onClick={handleNewGame}>
              BET
            </BetButton>

          </BetsArea>
          <Game>
            {
              game.length > 0 && (
                Lines.map((row) => (
                  <Line>
                    {
                      game.filter(({ line }) => line === row).map(({ odds, position, oppened }) => (
                        <Mine onClick={() => gameClick(row, position)}>
                          {
                            !oppened && odds !== 0 ? odds : 'crashow'
                          }
                        </Mine>
                      ))
                    }
                  </Line>
                ))
              )
            }

          </Game>
        </GameArea>
        {/* {renderButtons(context.value, false, handleNewGame, inputValue, setValue, false, onOpen)} */}
      </Area>
    </Layout>
  )
}