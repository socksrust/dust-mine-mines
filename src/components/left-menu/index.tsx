import React, { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Select from '../common/select'
import Space from '../common/space'
import { CurrencyContext } from '../../pages/_app';

import styled from '@emotion/styled'
import {
  Text,
} from '@chakra-ui/react';
import constants from '../../utils/constants';
const { objects: { coins }, colors: { accentColor, objectText } } = constants

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: transparent;
  height: 100%;
  margin-right: 30px;
  z-index: 4;
`

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 2rem;
  ${p => p.isActive && `
    align-items: center;
    background-color: ${accentColor};
  `}
`


const MenuItem = ({ text, onClick, isActive }) => (
  <MenuItemWrapper onClick={onClick} isActive={isActive}>
    <Text fontSize="14" fontWeight="bold" color={objectText} style={{ whiteSpace: 'nowrap' }} >{text}</Text>
  </MenuItemWrapper>
)

interface LeftMenuProps { }

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: medium;
`

const Label = ({ label, imgSrc }) => (
  <LabelWrapper>
    <img src={imgSrc} height="20px" width="20px" style={{ borderRadius: "55%", border: '0.8px solid #070B17' }} />
    <Space width={8} />
    {label}
  </LabelWrapper>
)

const additionalOptions = coins && coins[0] ? coins.map(coin => ({
  label: <Label label={coin.label} imgSrc={coin.imgSrc} />, value: coin.value
})) : []

const options = [
  // { label: <Label label="$SOL" imgSrc="/images/coin-logos/sol.jpg" />, value: 'SOL' },
  ...additionalOptions,
  /*{label: <Label label="$BETS" imgSrc="/images/coin-logos/bets.jpg" />, value: 'BETS'},
  {label: <Label label="$USDC" imgSrc="/images/coin-logos/usdc.jpg" />, value: 'USDC'},
  {label: <Label label="$USDT" imgSrc="/images/coin-logos/usdt.jpg" />, value: 'USDT'},
  {label: <Label label="$BIP" imgSrc="/images/coin-logos/bip.jpg" />, value: 'BIP'},
  {label: <Label label="$YODA" imgSrc="/images/coin-logos/yoda.jpg" />, value: 'YODA'},
  {label: <Label label="$HIPPO" imgSrc="/images/coin-logos/HIPPO.jpg" />, value: 'HIPPO'},
  {label: <Label label="$DEGN" imgSrc="/images/coin-logos/degen.jpg" />, value: 'DEGN'},
  {label: <Label label="$OOGI" imgSrc="/images/coin-logos/oogi.jpg" />, value: 'OOGI'},
  {label: <Label label="$SHROOMZ" imgSrc="/images/coin-logos/SHROOMZ.jpg" />, value: 'SHROOMZ'},
  {label: <Label label="$SPKL" imgSrc="/images/coin-logos/spkl.jpg" />, value: 'SPKL'},
  {label: <Label label="$DRUGS" imgSrc="/images/coin-logos/drugs.jpg" />, value: 'DRUGS'},
  {label: <Label label="$NRA" imgSrc="/images/coin-logos/nra.jpg" />, value: 'NRA'},*/
]

const LeftMenu: FC<LeftMenuProps> = () => {
  const { push, replace } = useRouter();
  const context = useContext(CurrencyContext) || { value: 'SOL' }

  return (
    <>
      <Wrapper>
        {/*<MenuOutItem text="Buy $BIP" onClick={() => window.open('https://app.thestarship.finance/', '_ blank')} />*/}
        <Select value={options.find(a => a.value === context.value)} options={options} onChange={(option) => context.setValue(option.value)} />
        <Space width={30} />
        <MenuItem text="Coinflip" onClick={() => push('/')} isActive={window.location.pathname === '/'} />
        <MenuItem text="Dice" onClick={() => push('/dice')} isActive={window.location.pathname === '/dice'} />
        <MenuItem text="Roulette" onClick={() => push('/wheel')} isActive={window.location.pathname === '/wheel'} />
        {/* <MenuItem text="Mine" onClick={() => push('/mine')} isActive={window.location.pathname === '/mine'}  /> */}

        <MenuItem text="Blackjack" onClick={() => push('/blackjack')} isActive={window.location.pathname === '/blackjack'}  />
        <MenuItem text="RPS" onClick={() => push('/rps')} isActive={window.location.pathname === '/rps'}  />
        <MenuItem text="Balance" onClick={() => push('/balance')} isActive={window.location.pathname === '/balance'}  />

        {/*<MenuItem text="Buy $TREATS" onClick={() => replace('https://raydium.io/swap/?inputCurrency=sol&outputCurrency=14r8dWfzmUUBpw59w5swNRb5F1YWqmUnSPgD6djUs1Jj&inputAmount=1&outputAmount=3014.368777&fixed=in')} isActive={false}  />*/}
        {/*<MenuItem text="Rock paper scissors" onClick={() => push('/rps')} isActive={window.location.pathname === '/rps'}  />*/}
      </Wrapper>
    </>
  );
};

export default LeftMenu;
