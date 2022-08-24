import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import networkReducer from "./networkReducer";
import { uiReducer } from "./uiReducer";

export default combineReducers({
    user: userReducer,
    network: networkReducer,
    ui: uiReducer
});