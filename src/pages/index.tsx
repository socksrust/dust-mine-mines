import { useDisclosure } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useContext, useEffect, useState } from "react";
import { Layout } from "../components/common/layout";
import { SignMessage } from "../utils/SignMessage";
import { renderButtons } from "../utils/solana";
import { CurrencyContext } from "./_app";
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
  Mine,
  Bomb,
  Option,
  OptionsArea
} from "./styles";
import constants from "../utils/constants";
import bs58 from "bs58";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import MOCK from "./data.json";

const {
  colors,
  infos,
  objects: { coins },
} = constants;
const Lines = [1, 2, 3, 4, 5];

export default function Mines() {
  const toast = useToast();
  const context = useContext(CurrencyContext);
  const [inputValue, setValue] = useState(0);
  const [selectCount, setSelectCount] = useState(5);
  const [gameId, setGameId] = useState();
  const [game, setGame] = useState([]);
  const [lose, setLose] = useState(false);
  const [cashoutAvailable, setCashoutAvailable] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [finished, setFinished] = useState(false);

  const { connected, publicKey, signTransaction, signMessage } = useWallet();

  async function handleNewGame() {
    if (!connected) return;
    const tokenMint = coins.find(({ value }) => value === context.value);

    if (!tokenMint) return;
    if (inputValue === 0 || inputValue < 0.1 || inputValue > 1) return;
    const signature = await SignMessage({ publicKey, connected, signMessage });

    const body = {
      wallet: publicKey?.toString(),
      project: infos.project,
      amount: inputValue,
      tokenMint: tokenMint.mintAddress,
      signature: bs58.encode(signature),
      totalMines: selectCount,
    };

    const { data } = await axios.post(`${infos.serverUrl}/mines/newgame`, body);
    setMultiplier(data.multiplier);
    setCashoutAvailable(data.cashoutAvailable);
    setGameId(data.gameId);
    setGame(data.mines);
    setLose(false);
  }

  async function gameClick(line: number, position: number) {
    const body = {
      gameId,
      selected: {
        line,
        position,
      },
    };
    const { data } = await axios.post(
      `${infos.serverUrl}/mines/select-cactusino`,
      body
    );
    setGame(data.mines);
    setMultiplier(data.multiplier);
    setCashoutAvailable(data.cashoutAvailable);
    const finder = data.mines.find(({ odds }) => odds === 0);
    if (finder) {
      toast({
        title: `Ops.`,
        description: `Not your lucky play, try again. You lost ${inputValue} ${context.value}`,
        status: "warning",
        duration: 15000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });
      setLose(true);
    }
  }

  async function endGame() {
    if (multiplier == 0) return;
    const body = {
      gameId,
    };
    try {
      const { data } = await axios.post(
        `${infos.serverUrl}/mines/cashout`,
        body
      );
      setLose(true);

      toast({
        title: `Yayyyy!!`,
        description: `You got ${data.amount} back! They will be added to your balance in less than a minute! Keep going!!`,
        status: "info",
        duration: 15000,
        isClosable: true,
        position: "top-right",
        variant: "solid",
      });
    } catch (error) {
      console.log(error.data.message);
    }
  }

  return (
    <Layout
      style={{
        background: `#111922")`,
      }}
    >
      <Area>
        <GameArea>
          <BetsArea>
            <Label>
              <span>Amount</span>
              <Input
                type="number"
                onChange={({ target }) => setValue(Number(target.value))}
              />
            </Label>

            <Label>
              <span>MINES</span>
              <OptionsArea>
                <Option
                  onClick={() => setSelectCount(5)}
                  active={selectCount === 5}
                >
                  5
                </Option>

                <Option
                  onClick={() => setSelectCount(10)}
                  active={selectCount === 10}
                >
                  10
                </Option>

                <Option
                  onClick={() => setSelectCount(24)}
                  active={selectCount === 24}
                >
                  24
                </Option>
              </OptionsArea>
            </Label>

            {gameId && !lose && (
              <BetButton onClick={endGame}>
                CASHOUT {cashoutAvailable.toFixed(2)}
              </BetButton>
            )}
            <BetButton isBottom={true} onClick={handleNewGame}>
              BET
            </BetButton>
          </BetsArea>
          <Game>
            {!finished &&
              game.length > 0 &&
              Lines.map((row) => (
                <Line>
                  {game
                    .filter(({ line }) => line === row)
                    .map(({ odds, position, oppened }) => (
                      <Mine onClick={() => gameClick(row, position)}>
                        {oppened && odds > 0 ? (
                          `${odds}X`
                        ) : odds === 0 ? (
                          <Bomb src="https://pbs.twimg.com/profile_images/1552726953748316163/pLA6X0EW_400x400.jpg" />
                        ) : (
                          ""
                        )}
                      </Mine>
                    ))}
                </Line>
              ))}
            {game.length === 0 &&
              Lines.map((row) => (
                <Line>
                  {MOCK.filter(({ line }) => line === row).map(
                    ({ odds, position, oppened }) => (
                      <Mine onClick={() => gameClick(row, position)}>
                        {oppened && odds > 0 ? (
                          `${odds}X`
                        ) : odds === 0 ? (
                          <Bomb src="https://media.discordapp.net/attachments/1004483679671816294/1004859864960471050/mines.png" />
                        ) : (
                          ""
                        )}
                      </Mine>
                    )
                  )}
                </Line>
              ))}
          </Game>
        </GameArea>
        {/* {renderButtons(context.value, false, handleNewGame, inputValue, setValue, false, onOpen)} */}
      </Area>
    </Layout>
  );
}
