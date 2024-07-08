import { CLEAR_APLAYER, SAVE_APLAYER } from "../constants";

const initState:object={}

type Action={
    type:string,
    data:object,
}

export default function aplayerReducer(prevState=initState,action:Action){
    const {type,data}=action;

    switch(type){
        case SAVE_APLAYER:
        case CLEAR_APLAYER:
            return data;

        default:
            return prevState;
    }
}