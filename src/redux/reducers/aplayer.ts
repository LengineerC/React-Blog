import { CLEAR_APLAYER, SAVE_APLAYER } from "../constants";

const initState:object={}

type Action={
    type:string,
    payload:object,
}

export default function aplayerReducer(prevState=initState,action:Action){
    const {type,payload}=action;

    switch(type){
        case SAVE_APLAYER:
        case CLEAR_APLAYER:
            return payload;

        default:
            return prevState;
    }
}