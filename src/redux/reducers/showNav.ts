import { SET_NAV_HIDDEN, SET_NAV_SHOW } from "../constants";
// import { payloadType } from "../payloadType";

type Action={
    type:string,
    // payload?:payloadType,
    payload:boolean
}

const initState:boolean=true;

export default function navSwitchReducer(prevState=initState,action:Action){
    const {type}=action;
    // console.log(payload);
    
    switch(type){
        case SET_NAV_SHOW:
            return true;
        case SET_NAV_HIDDEN:
            return false;
        default:
            return prevState;
    }
}