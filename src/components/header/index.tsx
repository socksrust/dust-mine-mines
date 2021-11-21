import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Image } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { Button } from '../button';
import { ConnectWallet } from '../button/connectWallet';
import { motion } from 'framer-motion';
import { useScrollFramer } from '../../hooks/useScrollFramer';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { push } = useRouter();
  const { startedScrolling } = useScrollFramer(0.04);

  return (
    <>
      <motion.div
        animate={{
          backdropFilter: `blur(${!startedScrolling ? 0 : 10}px)`,
          WebkitBackdropFilter: `blur(${!startedScrolling ? 0 : 10}px)`,
        }}
        style={{
          zIndex: 30,
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
          >
            <Image
              cursor="pointer"
              onClick={() => push('/')}
              src="/images/logo.png"
              maxW="250px"
            />
            <ConnectWallet />
          </Flex>
        </Flex>
      </motion.div>
    </>
  );
};

export default Header;
