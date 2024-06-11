import { SET_DARKMODE_OFF, SET_DARKMODE_ON } from "../constants";

interface Action{
    type:string,
    data?:boolean,
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