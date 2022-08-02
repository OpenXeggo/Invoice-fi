export const addChainIdAction = (chainId) => {
    return { type: "ADD_CHAIN_ID", payload: chainId };
  };
  
  export const addNetworkName = (name) => {
    return { type: "ADD_NETWORK_NAME", payload: name };
  };
  
  export const addIsNetworkSupported = (isSupported) => {
    
    return { type: "ADD_IS_NETWORK_SUPPORTED", payload: isSupported };
  };