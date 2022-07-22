const user = {
    address: "",
    balance: "",
};


export const userReducer = (state = user, action) => {
    switch (action.type) {
      case "ADD_USER_ADDRESS":
        return { ...state, address: action.payload };
      case "ADD_USER_BALANCE":
        return { ...state, balance: action.payload };
      default:
        return state;
    }
  };