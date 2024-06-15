import { SET_NAV_HIDDEN, SET_NAV_SHOW } from "../constants";
import { DataType } from "../dataType";

type Action={
    type:string,
    data?:DataType,
}

const initState:boolean=true;

export default function navSwitchReducer(prevState=initState,action:Action){
    const {type}=action;
    // console.log(data);
    
    switch(type){
        case SET_NAV_SHOW:
            return true;
        case SET_NAV_HIDDEN:
            return false;
        default:
            return prevState;
    }
}