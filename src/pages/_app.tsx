import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { ThemeProvider, createTheme } from '@material-ui/core';
import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import '../styles/styles.css'
import '../components/dice/dice.css'
import '../components/slot/slot.css'

export const CurrencyContext = React.createContext<any>({});

const theme1 = createTheme({
  palette: {
    type: 'dark',
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: 'flex-start',
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: '12px 16px',
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
    },
  },
});

const WalletConnectionProvider = dynamic(
  () => import('../providers/wallet-connection-provider'),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  const [value, setValue] = React.useState('USDC')
  const router = useRouter();
  const { currency, r } = router.query

  const handleRouteChange = (url: string) => {
    //@ts-ignore
    window.gtag('config', '[Tracking ID]', {
      page_path: url,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if(r && typeof r === 'string') {
        localStorage.setItem('r', r);
      }
      if(currency && typeof currency === 'string') {
        const newValue = currency.toUpperCase();
        localStorage.setItem('value', newValue);
        setValue(newValue);
      }
      const v: any = localStorage?.getItem('value');
      setValue(v);
    }
  }, [currency, r])

  const handleValue = (v: any) => {
    setValue(v)
    if (typeof window !== "undefined") {
      localStorage.setItem('value', v);
    }
  }


  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <CurrencyContext.Provider value={{value, setValue: (v: string) => handleValue(v)}}>
      <ThemeProvider theme={theme1}>
        <ChakraProvider theme={theme}>
          <DefaultSeo {...SEO} />
          <WalletConnectionProvider>
            <WalletDialogProvider>
              <Component {...pageProps} />
            </WalletDialogProvider>
          </WalletConnectionProvider>
        </ChakraProvider>
      </ThemeProvider>
    </CurrencyContext.Provider>
  );
}

export default MyApp;
