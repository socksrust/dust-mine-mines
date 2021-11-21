import {
  WalletDialogProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-material-ui';
import { useRef, forwardRef, useEffect } from 'react';
import { Button as NoiaButton } from '../button';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

const LoginButton = forwardRef((props: any, ref) => (
  <WalletMultiButton innerRef={ref} {...props} />
));

const Connect = () => {
  const loginRef: any = useRef(null);
  const wallet = useAnchorWallet();

  useEffect(() => console.log(wallet), []);

  const handleClick = () => {
    console.log('aaa');
    loginRef?.current?.click();
  };

  return (
    <WalletDialogProvider>
      <WalletMultiButton
        style={{
          background: '#ABFC4F',
          color: '#1C0C23',
          fontWeight: 'bold',
          borderRadius: '2px',
          paddingLeft: '2rem',
          fontFamily: 'Goldman',
          paddingRight: '2rem',
        }}
      />
    </WalletDialogProvider>
  );
};

export default Connect;
