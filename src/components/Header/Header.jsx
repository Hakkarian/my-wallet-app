import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { HeaderCss, LogoCss } from './Header.styled';
import HomePage from '../HomePage';

import logo from '../../images/logo.png';

const Header = () => {
  const chains = [arbitrum, mainnet, polygon];
  const projectId = "1dd2af04df9ad075462c8ec7692ce382";

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  
  return (
    <HeaderCss>
      <LogoCss  href="/"><img src={logo} alt="a wallet" width={40} height={40}/></LogoCss>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <WagmiConfig config={wagmiConfig}>
        <HomePage />
      </WagmiConfig>
    </HeaderCss>
  );
} 

export default Header