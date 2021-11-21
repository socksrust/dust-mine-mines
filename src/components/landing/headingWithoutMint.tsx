import { Flex, useMediaQuery } from '@chakra-ui/react';
import { Button } from '../button';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useWindowWidth } from '../../hooks/useWindowSize';

export const animation = {
  transition: { duration: 0.5 },
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const GradientText = styled.h1`
  font-size: 85px;
  @media only screen and (max-width: 800px) {
    font-size: 50px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 40px;
  }
  font-weight: bold;
  font-family: Poppins, sans-serif;
  text-transform: uppercase;
  background: linear-gradient(95.34deg, #a3ff3c 2.47%, #ffffff 82.15%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  text-align: center;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

interface Props {
  title: React.ReactNode;
  buttonAction: () => void;
  buttonLabel: string;
}

export const Heading = (props: Props) => {
  const { windowSizeX } = useWindowWidth();
  return (
    <motion.div
      style={{ width: '100vw' }}
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
        zIndex={10}
        direction="column"
      >
        <Flex
          zIndex="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          direction="column"
          height="100%"
          bg="linear-gradient(180deg, rgba(29, 34, 44, 0) 10.11%, #000 90%);"
        >
          <GradientText>{props.title}</GradientText>
          <Button
            onClick={props.buttonAction}
            size="giant"
            variant="outline"
            margin="30px"
          >
            {props.buttonLabel}
          </Button>
        </Flex>
      </Flex>
    </motion.div>
  );
};
