import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button as Base, ButtonProps } from '@chakra-ui/react';

export interface IButtonProps extends ButtonProps {
  isSmaller?: boolean;
  size?: 'bigger' | 'smaller' | 'giant';
  bg?: string;
}

export const Button: React.FC<IButtonProps> = ({
  size,
  bg = 'green',
  ...props
}) => {
  const { variant } = props;
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';
  const isSolid = variant === 'solid' || !variant;

  const background = isSolid ? bg : undefined;

  const sizes = useMemo(() => {
    switch (size) {
      case 'bigger':
        return {
          padding: '25px',
          fontSize: '14px',
        };

      case 'giant':
        return {
          padding: '30px',
          fontSize: '18px',
        };

      default:
        return {
          padding: '9px 18px',
          fontSize: '14px',
        };
    }
  }, [size]);

  return (
    <Base
      {...props}
      bg={background}
      borderRadius="4px"
      padding={sizes.padding}
      color={isOutline || isGhost ? 'white' : 'black'}
      fontFamily="Inter"
      border={isOutline ? '1px' : undefined}
      borderColor="white"
      fontSize={sizes.fontSize}
      fontWeight="600"
      _hover={{
        transform: 'scale(1.1)',
        background: '#070B17',
        color: 'white',
      }}
      _active={{
        transform: 'scale(1)',
        background: '#070B17',
        color: 'black',
      }}
    />
  );
};
