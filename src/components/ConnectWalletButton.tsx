import { Button } from "@mantine/core"
import { disconnect } from "@wagmi/core";
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export const ConnectWalletButton = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  }

  const renderConnectText = () => {
    if (isConnected) {
      const start = address?.slice(0,6);
      const end = address?.slice(address.length-4, address.length);
      return `${start}...${end}`;
    } else {
      return "Connect Wallet";
    }
  }
  
  return (
    <Button onClick={handleClick}>
      { renderConnectText() }
    </Button>
  )
}