import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled'
import { useRouter } from 'next/router';
import { Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { ConnectWallet } from '../button/connectWallet';
import { motion } from 'framer-motion';
import { useScrollFramer } from '../../hooks/useScrollFramer';
import LeftMenu from '../left-menu';
import Space from '../common/space';
import constants from '../../utils/constants';

const { objects, colors } = constants;
const { logo, logoUrl } = objects;

const Image = styled.img`
  width: 360px;
  /* margin-left: 20px; */
  /* border-radius: 50%; */
  /* border: 1px solid white; */
  @media (max-width: 750px) {
  }
`

const MyText = styled(Text)`
  @media (max-width: 750px) {
  }
`

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
          paddingTop: 20,
        }}
      >
        <Flex
          // p="20px"
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          <Flex
            direction="column"
            justifyContent="space-between"
            w="100%"
            alignItems="center"
            flexWrap='wrap'
            justifyItems='center'
            style={window.innerWidth <= 800 ? { direction: 'initial'} : {zIndex: 9,}}
          >
            <div
              onClick={() => push('/')}
              width="120px"
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <Image src={logoUrl}/>
              {/* <MyText color={colors.objectText} ml={5} fontSize="24px" fontWeight="bold">{logo}</MyText> */}
              </div>
            <Space width={30} height={20}/>
            <Flex
              direction="row"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              flexWrap='wrap'
              justifyItems='center'
            >
              <LeftMenu />
              
            </Flex>
          </Flex>
        </Flex>
      </motion.div>
    </>
  );
};

export default Header;
