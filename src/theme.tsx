import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import constants from './utils/constants';
const { colors } = constants;
const { primaryBackground, secondaryBackground } = colors;

const fonts = { mono: `'Barlow', Barlow` };

const color = {
  green: '#ABFC4F',
  linearGradient:
    'linear-gradient(180deg, #ACC0E3 0%, rgba(149, 242, 43, 0) 100%);',
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
      fontFamily: "'Inter', sans-serif",
      // background: 'rgb(92,60,84)',
      // background: 'radial-gradient(circle, rgba(203,222,255,1) 0%, rgba(172,192,227,1) 100%)',
      backgroundColor: '#051123',
      // backgroundImage: "https://i.imgur.com/384wnoE.jpg",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
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
