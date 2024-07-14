import { combineReducers } from "redux";
import navSwitchReducer from "./showNav";
import darkModeReducer from "./darkMode";
import postListReducer from "./postList";
import selectedPostConfigReducer from "./selectedPostConfig";
import selectedPostHtmlReducer from "./selectedPostHtml";
import tagsListReducer  from "./tagsList";
import categoriesListReducer from "./categoriesList";
import aplayerReducer from "./aplayer";
import friendsUrlDataReducer from "./freindsUrlData";
import githubRepoCommitsReducer from "./githubRepoCommits";

export const allReducers=combineReducers({
    navState:navSwitchReducer,
    darkMode:darkModeReducer,
    postList:postListReducer,
    selectedPostConfig:selectedPostConfigReducer,
    selectedPostHtml:selectedPostHtmlReducer,
    tagsList:tagsListReducer,
    categoriesList:categoriesListReducer,
    aplayer:aplayerReducer,
    friendsUrlData:friendsUrlDataReducer,
    githubRepoCommits:githubRepoCommitsReducer,
});
