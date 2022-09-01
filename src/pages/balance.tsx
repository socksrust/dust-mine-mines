import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import { Layout } from "../components/common/layout";
import { CurrencyContext } from "./_app";
import constants from "../utils/constants";
import {
  CreateSOLTX,
  CreateTX,
  handleClaim,
  ClaimSol,
} from "../utils/CreateTX";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const {
  objects: { coins },
  colors: { accentColor, objectText, objectBackground, buttonText },
  infos,
} = constants;

const Area = styled.div`
  min-height: calc(100vh - 300px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Content = styled.div`
  width: 90%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border-radius: 4px;
  justify-content: flex-start;
  gap: 12px;
  background-color: #1c242c;

  span {
    font-size: 42px;
    font-weight: bold;
  }
`;

const Button = styled.button<{ isLoading: boolean }>`
  margin: 0;
  background-color: #121e30;
  color: ${objectText};
  height: 40px;
  border-radius: 4px;
  transition: 0.2s;
  cursor: ${({ isLoading }) => (isLoading ? "wait" : "pointer")};
  color: #000;
  background-color: #60d184;
  width: 100%;
  :hover {
    transform: scale(1.1);
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  outline: none;
  color: #000;
  padding: 0 6px;
  color: ${objectText};
  background: rgba(0, 0, 0, 0.15);
  color: #fff;
  border-radius: 4px;

  ::placeholder {
    color: #dadada;
  }

  :focus {
    border: 1px solid #dadada;
  }
`;

const BalanceArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    font-size: 20px;
    font-weight: bold;
  }
`;

const Select = styled.select`
  height: 40px;
  width: 100%;
  border-radius: 4px;
  background-color: #121e30;
  color: ${objectText};
  background: rgba(0, 0, 0, 0.15);
  color: #fff;
`;

export default function Balance() {
  const [amount, setAmount] = useState(1);
  const [withdraw, setWithdraw] = useState(1);
  const [currency, setCurrency] = useState("$SOL");
  const {
    objects: { coins },
  } = constants;
  const { connected, publicKey, signTransaction } = useWallet();

  const [solBalance, setSolBalance] = useState(0);
  const [flyBalance, setFlyBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  function handleChange({ value }) {
    setCurrency(value);
  }
  useEffect(() => {
    if (connected) {
      updateBalances();
    }
  }, [connected]);

  function updateBalances() {
    const body = {
      project: infos.project,
      wallet: publicKey?.toString(),
    };

    axios.post(`${infos.serverUrl}/balance`, body).then(({ data }) => {
      data.forEach(({ amount, tokenMint }) => {
        if (tokenMint === "11111111111111111111111111111111") {
          setSolBalance(amount);
        } else {
          setFlyBalance(amount);
        }
      });
    });
  }

  function callToast() {
    toast({
      title: `Processing!`,
      description:
        "Your transaction is processing. It can take up to 2 minutes",
      status: "warning",
      duration: 60000,
      isClosable: true,
      position: "top-right",
      variant: "solid",
    });
  }

  async function AddFunds() {
    if (!connected) {
      toast({
        title: `Warning!`,
        description: "You need to connect your wallet",
        status: "warning",
        duration: 60000,
        isClosable: true,
        position: "top-right",
        variant: "solid",
      });
      return;
    }
    const token = coins.find(({ label }) => label === currency);
    let final: any = token;
    if (!token) {
      final = {
        value: "SOL",
        multiplier: Math.pow(10, 9),
      };
    }
    if (currency === "$SOL") {
      await CreateSOLTX({
        publicKey,
        signTransaction,
        token: final,
        amount,
        callToast,
      });

      updateBalances();
    } else {
      await CreateTX({
        publicKey,
        signTransaction,
        token: final,
        amount,
        callToast,
      });
      updateBalances();
    }
  }

  async function requestWithdraw() {
    const token = coins.find(({ label }) => label === currency);

    if (currency !== "$SOL") {
      await handleClaim(
        publicKey?.toString() || "",
        token || "",
        signTransaction,
        withdraw,
        callToast
      );
      setIsLoading(true);
      updateBalances();
      setIsLoading(false);
    } else {
      setIsLoading(true);
      await ClaimSol(
        publicKey?.toString() || "",
        token || "",
        signTransaction,
        withdraw,
        callToast
      );
      updateBalances();
      setIsLoading(false);
    }
  }

  return (
    <Layout
      style={{
        background: `#111922`,
      }}
    >
      <Area>
        <Content>
          <span
            style={{
              paddingBottom: 10,
            }}
          >
            Add Balance
          </span>
          {connected && (
            <BalanceArea>
              <span>$SOL: {solBalance.toFixed(3)}</span>
              <span>$DUST: {flyBalance.toFixed(3)}</span>
            </BalanceArea>
          )}
          <Input
            placeholder="Amount"
            type="number"
            onChange={({ target: { value } }) => setAmount(value)}
            value={amount}
          />
          <Select onChange={({ target }) => handleChange(target)}>
            {coins.map(({ label }) => (
              <option>{label}</option>
            ))}
          </Select>

          <Button onClick={AddFunds} isLoading={isLoading}>
            Add Funds
          </Button>
        </Content>

        <Content>
          <span
            style={{
              paddingBottom: 10,
            }}
          >
            Withdraw
          </span>
          {connected && (
            <BalanceArea>
              <span>$SOL: {solBalance.toFixed(3)}</span>
              <span>$DUST: {flyBalance.toFixed(3)}</span>
            </BalanceArea>
          )}
          <Input
            placeholder="Amount"
            type="number"
            onChange={({ target: { value } }) => setWithdraw(value)}
            value={withdraw}
          />
          <Select onChange={({ target }) => handleChange(target)}>
            {coins.map(({ label }) => (
              <option value={label} key={label}>
                {label}
              </option>
            ))}
          </Select>

          <Button onClick={requestWithdraw} isLoading={isLoading}>
            Request Withdraw
          </Button>
        </Content>
      </Area>
    </Layout>
  );
}
