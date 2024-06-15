import { 
    SET_DARKMODE_OFF, 
    SET_DARKMODE_ON, 
    SET_NAV_HIDDEN, 
    SET_NAV_SHOW,
    SAVE_POST_LIST,
    CLEAR_POST_LIST,
} from "./constants";

import { PostConfig } from "../utils/types";

//Nav展开收起
export const showNav=()=>({type:SET_NAV_SHOW})

export const hideNav=()=>({type:SET_NAV_HIDDEN})

// 夜间模式开关
export const darkmodeOFF=()=>({type:SET_DARKMODE_OFF})

export const darkmodeON=()=>({type:SET_DARKMODE_ON})

//文章列表
export const savePostList=(postList:PostConfig[])=>({
    type:SAVE_POST_LIST,
    data:postList
})

export const clearPostList=()=>({type:CLEAR_POST_LIST})