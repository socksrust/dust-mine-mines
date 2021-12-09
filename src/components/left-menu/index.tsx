import React, { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Image } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { Button } from '../button';
import { ConnectWallet } from '../button/connectWallet';
import { motion } from 'framer-motion';
import { useScrollFramer } from '../../hooks/useScrollFramer';
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
`

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 10px;
  width: calc(100% - 36px);
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

const MenuOutItem = ({text, onClick, isActive}) => (
  <MenuItemWrapper onClick={onClick} isActive={isActive}>
    <Text fontSize="24" fontWeight="bold" color="#ABFC4F" style={{ whiteSpace: 'nowrap' }} >{text}</Text>
  </MenuItemWrapper>
)

interface LeftMenuProps {}

const options = [
  {label: '$BIP', value: 'BIP'},
  {label: '$USDC', value: 'USDC'},
  {label: '$SOL', value: 'SOL'},
]

/*
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]*/


const LeftMenu: FC<LeftMenuProps> = () => {
  const { push } = useRouter();
  const context = useContext(CurrencyContext)
  console.log(window.location.pathname)

  return (
    <>
      <Wrapper>
        {/*<MenuOutItem text="Buy $BIP" onClick={() => window.open('https://app.thestarship.finance/', '_ blank')} />*/}
        <Select value={{label: `$${context.value}`, value: context.value}} options={options} onChange={(option) => context.setValue(option.value)} />
        <Space width={90} />
        <MenuItem text="Games" onClick={() => push('/')} isActive={window.location.pathname === '/'} />
        <MenuItem text="Jack pot" onClick={() => push('/jackpot')} isActive={window.location.pathname === '/jackpot'} />
        <MenuItem text="Dice" onClick={() => push('/dice')} isActive={window.location.pathname === '/dice'} />
        <MenuItem text="Fortune wheel" onClick={() => push('/wheel')} isActive={window.location.pathname === '/wheel'}  />
        {/*<MenuItem text="Lottery" onClick={() => push('/lottery')} isActive={window.location.pathname === '/lottery'}  />
        <MenuItem text="Black Jack" />
  <MenuItem text="Poker" />*/}
      </Wrapper>
    </>
  );
};

export default LeftMenu;
