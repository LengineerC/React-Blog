import { combineReducers } from "redux";
import navSwitchReducer from "./showNav";
import darkModeReducer from "./darkMode";
import postListReducer from "./postList";
import selectedPostConfigReducer from "./selectedPostConfig";
import selectedPostHtmlReducer from "./selectedPostHtml";
import tagsListReducer  from "./tagsList";
import categoriesListReducer from "./categoriesList";
import aplayerReducer from "./aplayer";

export const allReducers=combineReducers({
    navSwitchReducer,
    darkModeReducer,
    postListReducer,
    selectedPostConfigReducer,
    selectedPostHtmlReducer,
    tagsListReducer,
    categoriesListReducer,
    aplayerReducer,
});
