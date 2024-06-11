import { combineReducers } from "redux";
import navSwitchReducer from "./showNav";
import darkModeReducer from "./darkMode";

export const allReducers=combineReducers({
    navSwitchReducer,
    darkModeReducer,
});
