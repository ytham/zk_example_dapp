import "@/styles/globals.css";
import { WagmiConfig, createClient, configureChains, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

// We'll just be using Goerli testnet for now
const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  // We'll be using Wagmi sending our transaction and Mantine for CSS
  // and notifications
  return (
    <WagmiConfig client={client}>
      <MantineProvider withNormalizeCSS>
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </WagmiConfig>
  );
}
