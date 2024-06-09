import { SET_NAV_HIDDEN, SET_NAV_SHOW } from "./constants";

export const showNav=()=>({
    type:SET_NAV_SHOW,
})

export const hideNav=()=>({
    type:SET_NAV_HIDDEN,
})