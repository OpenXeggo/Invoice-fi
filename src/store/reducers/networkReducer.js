const INIT_STATE = { chainId: "", name: "", isSupported: null };

const networkReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CHAIN_ID":
      return { ...state, chainId: action.payload };
    case "ADD_NETWORK_NAME":
      return { ...state, name: action.payload };
    case "ADD_IS_NETWORK_SUPPORTED":
      return { ...state, isSupported: action.payload };
    default:
      return state;
  }
};

export default networkReducer;