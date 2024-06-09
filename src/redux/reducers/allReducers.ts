import { combineReducers } from "redux";
import navSwitchReducer from "./showNav";

export const allReducers=combineReducers({
    navSwitchReducer,
});
