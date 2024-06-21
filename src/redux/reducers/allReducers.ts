import { combineReducers } from "redux";
import navSwitchReducer from "./showNav";
import darkModeReducer from "./darkMode";
import postListReducer from "./postList";
import selectedPostConfigReducer from "./selectedPostConfig";
import selectedPostHtmlReducer from "./selectedPostHtml";
import tagsListReducer  from "./TagsList";
import categoriesListReducer from "./CategoriesList";

export const allReducers=combineReducers({
    navSwitchReducer,
    darkModeReducer,
    postListReducer,
    selectedPostConfigReducer,
    selectedPostHtmlReducer,
    tagsListReducer,
    categoriesListReducer,
});
