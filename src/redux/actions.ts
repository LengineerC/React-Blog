import *  as actions from "./constants";

import { PostConfig, FriendUrl } from "../utils/types";

//Nav展开收起
export const showNav=()=>({type:actions.SET_NAV_SHOW})

export const hideNav=()=>({type:actions.SET_NAV_HIDDEN})

// 夜间模式开关
export const setDarkModeOFF=()=>({
    type:actions.SET_DARKMODE_OFF,
    payload:false,
})

export const setDarkModeON=()=>({
    type:actions.SET_DARKMODE_ON,
    payload:true,
})

//文章列表
export const savePostList=(postList:PostConfig[])=>({
    type:actions.SAVE_POST_LIST,
    payload:postList
})

export const clearPostList=()=>({
    type:actions.CLEAR_POST_LIST,
    payload:[]
})

//选中文章配置
export const saveSelectedPostConfig=(selectedPost:PostConfig)=>({
    type:actions.SAVE_SELECTED_POST_CONFIG,
    payload:selectedPost
})

export const clearSelectedPostConfig=()=>({
    type:actions.CLEAR_SELECTED_POST_CONFIG,
})//可能会有bug

//选中文章内容
export const saveSelectedPostHtml=(html:string)=>({
    type:actions.SAVE_SELECTED_POST_HTML,
    payload:html,
})

export const clearSelectedPostHtml=()=>({
    type:actions.CLEAR_SELECTED_POST_HTML,
    payload:'',
})


//TagsReducer Actions
export const saveTagsList=(tagsList:any)=>({
    type:actions.SAVE_TAGS_LIST,
    payload:tagsList
})

export const cleatTagsList=()=>({
    type:actions.CLEAR_TAGS_LIST,
    payload:[],
})

//Categories Actions
export const saveCategoriesList=(categoriesList:any)=>({
    type:actions.SAVE_CATEGORIES_LIST,
    payload:categoriesList
})

export const clearCategoriesList=()=>({
    type:actions.CLEAR_CATEGORIES_LIST,
    payload:[],
})

// APlayer Actions
export const saveAPlayer=(aplayer:object)=>({
    type:actions.SAVE_APLAYER,
    payload:aplayer
})

export const clearAPlayer=()=>({
    type:actions.CLEAR_APLAYER,
    payload:{}
})

// friendsUrlData Actions
export const saveFriendsUrlData=(data:FriendUrl[])=>({
    type:actions.SAVE_FRIENDS_URL_DATA,
    payload:data
})

export const clearFriendsUrlData=()=>({
    type:actions.CLEAR_FRIENDS_URL_DATA,
})