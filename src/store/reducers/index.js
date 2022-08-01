import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import networkReducer from "./networkReducer";

export default combineReducers({
  user: userReducer,
  network: networkReducer,
});