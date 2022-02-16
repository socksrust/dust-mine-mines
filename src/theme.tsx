import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import constants from './utils/constants';
const { colors } = constants;
const { primaryBackground, secondaryBackground } = colors;

const fonts = { mono: `'Barlow', Barlow` };

const color = {
  green: '#ABFC4F',
  linearGradient:
    'linear-gradient(180deg, rgba(136, 255, 0, 0.5) 0%, rgba(149, 242, 43, 0) 100%);',
  white: '#FFFFFF',
  black: primaryBackground,
  grey: '#8A898B',
  textGradient: 'linear-gradient(95.34deg, #ABFC4F 2.47%, #FFFFFF 82.15%)',
};

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const styles = {
  global: {
    body: {
      //   width: '100vw !important',
      fontFamily: "'DM Sans', sans-serif",
      backgroundColor: 'black',
      color: '#fff',
    },
  },
};

const theme = extendTheme({
  colors: color,
  styles,
  fonts,
  breakpoints,
});

export default theme;
