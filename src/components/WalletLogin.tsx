"use client";
import {
  connectorsForWallets,
  RainbowKitProvider,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { publicProvider } from "wagmi/providers/public";
import {
  googleWallet,
  facebookWallet,
  githubWallet,
  enhanceWalletWithAAConnector,
} from "@zerodevapp/wagmi/rainbowkit";
import { metaMaskWallet, coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";

import { createClient, WagmiConfig, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";

const defaultProjectId = "1fc3fe96-d630-4dab-817b-a3ada76f6408";

const WalletLogin = () => {
  const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai],
    [publicProvider()]
  );

  const connectors = connectorsForWallets([
    {
      groupName: "EOA Wrapped with AA",
      wallets: [
        enhanceWalletWithAAConnector(metaMaskWallet({ chains }), {
          projectId: defaultProjectId,
        }),
        enhanceWalletWithAAConnector(
          coinbaseWallet({ chains, appName: "Coinbase" }),
          { projectId: defaultProjectId }
        ),
      ],
    },
    {
      groupName: "Social (AA)",
      wallets: [
        googleWallet({ options: { projectId: defaultProjectId } }),
        facebookWallet({ options: { projectId: defaultProjectId } }),
        githubWallet({ options: { projectId: defaultProjectId } }),
      ],
    },
  ]);

  const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider,
    webSocketProvider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WalletLogin;
