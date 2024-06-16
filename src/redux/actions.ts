import *  as actions from "./constants";

import { PostConfig } from "../utils/types";

//Nav展开收起
export const showNav=()=>({type:actions.SET_NAV_SHOW})

export const hideNav=()=>({type:actions.SET_NAV_HIDDEN})

// 夜间模式开关
export const darkmodeOFF=()=>({type:actions.SET_DARKMODE_OFF})

export const darkmodeON=()=>({type:actions.SET_DARKMODE_ON})

//文章列表
export const savePostList=(postList:PostConfig[])=>({
    type:actions.SAVE_POST_LIST,
    data:postList
})

export const clearPostList=()=>({type:actions.CLEAR_POST_LIST})

//选中文章
export const saveSelectedPost=(selectedPost:PostConfig)=>({
    type:actions.SAVE_SELECTED_POST,
    data:selectedPost
})

export const clearSelectedPost=()=>({type:actions.CLEAR_POST_LIST})