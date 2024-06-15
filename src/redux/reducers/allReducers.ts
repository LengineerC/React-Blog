import { combineReducers } from "redux";
import navSwitchReducer from "./showNav";
import darkModeReducer from "./darkMode";
import postListReducer from "./postList";

export const allReducers=combineReducers({
    navSwitchReducer,
    darkModeReducer,
    postListReducer,
});
