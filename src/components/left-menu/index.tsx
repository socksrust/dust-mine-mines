import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Image } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { Button } from '../button';
import { ConnectWallet } from '../button/connectWallet';
import { motion } from 'framer-motion';
import { useScrollFramer } from '../../hooks/useScrollFramer';
import styled from '@emotion/styled'
import {
  Text,
} from '@chakra-ui/react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #000;
  width: 256px;
  height: 100%;
  padding-right: 20px;
  margin-left: 20px;
`

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 18px;
  cursor: pointer;
  width: calc(100% - 36px);
  border-radius: 2px;
  ${p => p.isActive && `
    padding-left: 38px;
    width: calc(100% - 46px);
    background-color: #ABFC4F;
  `}
`


const MenuItem = ({text, onClick, isActive}) => (
  <MenuItemWrapper onClick={onClick} isActive={isActive}>
    <Text fontSize="14" fontWeight="bold" color={isActive ? '#000' : '#808191'}>{text}</Text>
  </MenuItemWrapper>
)

const MenuOutItem = ({text, onClick, isActive}) => (
  <MenuItemWrapper onClick={onClick} isActive={isActive}>
    <Text fontSize="24" fontWeight="bold" color="#ABFC4F">{text}</Text>
  </MenuItemWrapper>
)

interface LeftMenuProps {}

const LeftMenu: FC<LeftMenuProps> = () => {
  const { push } = useRouter();
  console.log(window.location.pathname)

  return (
    <>
      <Wrapper>
        {window.location.pathname !== '/' && <MenuOutItem text="Buy $BIP" onClick={() => window.open('https://app.thestarship.finance/', '_ blank')} />}
        <MenuItem text="Games" onClick={() => push('/')} isActive={window.location.pathname === '/'} />
        <MenuItem text="Dice" onClick={() => push('/dice')} isActive={window.location.pathname === '/dice'} />
        <MenuItem text="Fortune Wheel" onClick={() => push('/wheel')} isActive={window.location.pathname === '/wheel'}  />
        <MenuItem text="Lottery" onClick={() => push('/lottery')} isActive={window.location.pathname === '/lottery'}  />
        <MenuItem text="Black Jack" />
        <MenuItem text="JackPot" />
        <MenuItem text="Poker" />
      </Wrapper>
    </>
  );
};

export default LeftMenu;
