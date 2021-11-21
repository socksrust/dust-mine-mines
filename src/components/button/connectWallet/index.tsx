import { useWalletDialog } from '@solana/wallet-adapter-material-ui';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { Button, IButtonProps } from '..';

export const ConnectWallet: React.FC<IButtonProps> = ({ ...props }) => {
  const wallet = useAnchorWallet();
  const { connected, disconnect } = useWallet();
  const { setOpen } = useWalletDialog();

  useEffect(() => console.log(wallet), []);

  const handleClick = () => setOpen(true);

  if (connected) {
    return (
      <Button onClick={disconnect} variant="outline" size="bigger" {...props}>
        Disconnect
      </Button>
    );
  }

  return (
    <Button size="bigger" onClick={handleClick} {...props}>
      Connect Wallet
    </Button>
  );
};
