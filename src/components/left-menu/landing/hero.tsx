import { Stack, Text, Flex, Image } from '@chakra-ui/react';
import { Button as NoiaButton } from '../button';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import * as anchor from '@project-serum/anchor';
import { getCandyMachineState } from '../../utils/candy-machine';
import { usePlatform } from '../../hooks/usePlatform';
import { ConnectWallet } from '../button/connectWallet';
import { GradientText } from './headingWithoutMint';

export const animation = {
  transition: { duration: 0.5 },
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const Hero = (props: any) => {
  const { device } = usePlatform();
  const router = useRouter();
  const wallet = useAnchorWallet();
  const { connected } = useWallet();
  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { itemsAvailable, itemsRemaining, itemsRedeemed } =
        await getCandyMachineState(
          wallet as anchor.Wallet,
          props.candyMachineId,
          props.connection
        );

      setItemsAvailable(itemsAvailable);
      setItemsRedeemed(itemsRedeemed);
    }
    if (!wallet) return;

    if (props.candyMachineId && props.connection) {
      fetchData();
    }
  }, [wallet]);

  return (
    <motion.div
      animate={animation.animate}
      transition={animation.transition}
      initial={animation.initial}
    >
      <Flex
        height={window.innerHeight}
        width="100%"
        backgroundImage="url('/images/bg.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="none"
        flex={1}
        direction="column"
      >
        <Flex
          zIndex="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          direction="column"
          height="100%"
          bg="linear-gradient(180deg, rgba(29, 34, 44, 0) 10.11%, #000 110%);"
        >
          <GradientText>
            OCTOPUS ART <br /> MINT NOW
          </GradientText>
          {!connected ? (
            <ConnectWallet
              size="giant"
              variant="outline"
              fontFamily="KoHo"
              margin="30px"
            />
          ) : (
            <NoiaButton
              onClick={() => props.scrollToDiv()}
              size="giant"
              variant="outline"
              fontFamily="KoHo"
              margin="30px"
            >
              Mint Now
            </NoiaButton>
          )}
        </Flex>
      </Flex>
    </motion.div>
  );
};
