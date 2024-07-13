import { SET_DARKMODE_OFF, SET_DARKMODE_ON } from "../constants";
// import { payloadType } from "../payloadType";

type Action={
    type:string,
    // payload?:payloadType
    payload:boolean
}

const initState:boolean=false;

export default function darkModeReducer(prevState=initState,action:Action){
    const {type}=action;
    switch(type){
        case SET_DARKMODE_OFF:
            return false;
        case SET_DARKMODE_ON:
            return true;
        default:
            return prevState;
    }

}