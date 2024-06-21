import *  as actions from "./constants";

import { PostConfig } from "../utils/types";

//Nav展开收起
export const showNav=()=>({type:actions.SET_NAV_SHOW})

export const hideNav=()=>({type:actions.SET_NAV_HIDDEN})

// 夜间模式开关
export const darkmodeOFF=()=>({
    type:actions.SET_DARKMODE_OFF,
    data:false,
})

export const darkmodeON=()=>({
    type:actions.SET_DARKMODE_ON,
    data:true,
})

//文章列表
export const savePostList=(postList:PostConfig[])=>({
    type:actions.SAVE_POST_LIST,
    data:postList
})

export const clearPostList=()=>({
    type:actions.CLEAR_POST_LIST,
    data:[]
})

//选中文章配置
export const saveSelectedPostConfig=(selectedPost:PostConfig)=>({
    type:actions.SAVE_SELECTED_POST_CONFIG,
    data:selectedPost
})

export const clearSelectedPostConfig=()=>({
    type:actions.CLEAR_SELECTED_POST_CONFIG,
})//可能会有bug

//选中文章内容
export const saveSelectedPostHtml=(html:string)=>({
    type:actions.SAVE_SELECTED_POST_HTML,
    data:html,
})

export const clearSelectedPostHtml=()=>({
    type:actions.CLEAR_SELECTED_POST_HTML,
    data:'',
})


//TagsReducer Actions
export const saveTagsList=(tagsList:any)=>({
    type:actions.SAVE_TAGS_LIST,
    data:tagsList
})

export const cleatTagsList=()=>({
    type:actions.CLEAR_TAGS_LIST,
    data:[],
})

//Categories Actions
export const saveCategoriesList=(categoriesList:any)=>({
    type:actions.SAVE_CATEGORIES_LIST,
    data:categoriesList
})

export const clearCategoriesList=()=>({
    type:actions.CLEAR_CATEGORIES_LIST,
    data:[],
})