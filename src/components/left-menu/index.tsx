import React, { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Select from '../common/select'
import Space from '../common/space'
import {CurrencyContext} from '../../pages/_app';

import styled from '@emotion/styled'
import {
  Text,
} from '@chakra-ui/react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: #02011F;
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
    background-color: #1B193F;
  `}
`


const MenuItem = ({text, onClick, isActive}) => (
  <MenuItemWrapper onClick={onClick} isActive={isActive}>
    <Text fontSize="14" fontWeight="bold" color={'#fff'} style={{ whiteSpace: 'nowrap' }} >{text}</Text>
  </MenuItemWrapper>
)

interface LeftMenuProps {}

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Label = ({ label, imgSrc }) => (
  <LabelWrapper>
    <img src={imgSrc} height="20px" width="20px" style={{borderRadius:"55%", border: '0.8px solid white'}}/>
    <Space width={8} />
    {label}
  </LabelWrapper>
)

const options = [
  {label: <Label label="$SOL" imgSrc="/images/coin-logos/sol.jpg" />, value: 'SOL'},
  {label: <Label label="$USDC" imgSrc="/images/coin-logos/usdc.jpg" />, value: 'USDC'},
  {label: <Label label="$USDT" imgSrc="/images/coin-logos/usdt.jpg" />, value: 'USDT'},
  {label: <Label label="$DEGN" imgSrc="/images/coin-logos/degen.jpg" />, value: 'DEGN'},
  {label: <Label label="$SPKL" imgSrc="/images/coin-logos/spkl.jpg" />, value: 'SPKL'},
  {label: <Label label="$DRUGS" imgSrc="/images/coin-logos/drugs.jpg" />, value: 'DRUGS'},
  {label: <Label label="$BIP" imgSrc="/images/coin-logos/bip.jpg" />, value: 'BIP'},
  {label: <Label label="$NRA" imgSrc="/images/coin-logos/nra.jpg" />, value: 'NRA'},
]

const LeftMenu: FC<LeftMenuProps> = () => {
  const { push } = useRouter();
  const context = useContext(CurrencyContext)
  console.log(window.location.pathname)

  return (
    <>
      <Wrapper>
        {/*<MenuOutItem text="Buy $BIP" onClick={() => window.open('https://app.thestarship.finance/', '_ blank')} />*/}
        <Select value={options.find(a => a.value === context.value)} options={options} onChange={(option) => context.setValue(option.value)} />
        <Space width={30} />

        <MenuItem text="Dice" onClick={() => push('/dice')} isActive={window.location.pathname === '/dice'} />
        <MenuItem text="Fortune wheel" onClick={() => push('/wheel')} isActive={window.location.pathname === '/wheel'}  />
        <MenuItem text="Jack pot" onClick={() => push('/jackpot')} isActive={window.location.pathname === '/jackpot'} />
        {/*<MenuItem text="Lottery" onClick={() => push('/lottery')} isActive={window.location.pathname === '/lottery'}  />
        <MenuItem text="Black Jack" />
  <MenuItem text="Poker" />*/}
      </Wrapper>
    </>
  );
};

export default LeftMenu;
