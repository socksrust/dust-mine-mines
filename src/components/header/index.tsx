import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { ConnectWallet } from '../button/connectWallet';
import { motion } from 'framer-motion';
import { useScrollFramer } from '../../hooks/useScrollFramer';
import LeftMenu from '../left-menu';
import Space from '../common/space';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { push } = useRouter();
  const { startedScrolling } = useScrollFramer(0.04);

  if(!window) {
    return null;
  }

  return (
    <>
      <motion.div
        animate={{
          backdropFilter: `blur(${!startedScrolling ? 0 : 10}px)`,
          WebkitBackdropFilter: `blur(${!startedScrolling ? 0 : 10}px)`,
        }}
        style={{
          zIndex: 900,
          //position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          transition: '0.1s',
        }}
      >
        <Flex
          p="20px"
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          <Flex
            direction="row"
            justifyContent="space-between"
            w="100%"
            alignItems="center"
            style={window.innerWidth <= 800 ? { overflow: 'scroll'} : {zIndex: 9,}}
          >
            <div
              cursor="pointer"
              onClick={() => push('/')}
              width="120px"
            >
              <Text color="#ffff" fontSize="36px" fontWeight="bold">SOL Flip</Text>
              </div>
            <Space width={30} height={20}/>
            <Flex
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <LeftMenu />
              <ConnectWallet />
            </Flex>
          </Flex>
        </Flex>
      </motion.div>
    </>
  );
};

export default Header;
