import { networks } from "../network.config.json";

const isChainSupported = (chainId) => {
  const supportedNetworks = Object.keys(networks);
  const isNetworkSupported = supportedNetworks.includes(chainId);
  return isNetworkSupported;
};

export default isChainSupported;