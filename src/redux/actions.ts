import { SET_DARKMODE_OFF, SET_DARKMODE_ON, SET_NAV_HIDDEN, SET_NAV_SHOW } from "./constants";

export const showNav=()=>({type:SET_NAV_SHOW})

export const hideNav=()=>({type:SET_NAV_HIDDEN})

export const darkmodeOFF=()=>({type:SET_DARKMODE_OFF})

export const darkmodeON=()=>({type:SET_DARKMODE_ON})