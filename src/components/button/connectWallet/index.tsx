import { useWalletDialog } from "@solana/wallet-adapter-material-ui";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { Button, IButtonProps } from "..";
import constants from "../../../utils/constants";

const { colors } = constants;
const {
  primaryBackground,
  secondaryBackground,
  objectBackground,
  objectText,
  buttonText,
} = colors;

export const ConnectWallet: React.FC<IButtonProps> = ({ ...props }) => {
  const wallet = useAnchorWallet();
  const { connected, disconnect } = useWallet();
  const { setOpen } = useWalletDialog();

  const handleClick = () => setOpen(true);

  if (connected) {
    return (
      <Button
        onClick={disconnect}
        variant="outline"
        size="bigger"
        {...props}
        backgroundColor={"#fff"}
        style={{ background: "#fff" }}
      >
        Disconnect
      </Button>
    );
  }

  return (
    <Button
      w="100%"
      size="bigger"
      onClick={handleClick}
      {...props}
      backgroundColor={"#fff"}
      style={{ background: "#fff" }}
    >
      <span style={{ color: "#000" }}>Connect Wallet</span>
    </Button>
  );
};
