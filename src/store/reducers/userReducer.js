const user = {
    address: "",
    balance: "",
    userData: {
      username: "", 
      lastname: "",
      firstname: "",
      user_id: "",
      email: "",
      invoices:[]
    }
};


export const userReducer = (state = user, action) => {
    switch (action.type) {
      case "ADD_USER_ADDRESS":
        return { ...state, address: action.payload };
      case "ADD_USER_BALANCE":
        return { ...state, balance: action.payload };
      case "ADD_USER_DATA":
        return { ...state, userData: {...action.payload} }
      default:
        return state;
    }
  };