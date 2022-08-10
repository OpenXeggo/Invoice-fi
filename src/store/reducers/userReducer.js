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
      case "ADD_INVOICE_ID":
        return {...state, userData: { invoices: [action.payload, ...state.userData.invoices] }}
      default:
        return state;
    }
  };