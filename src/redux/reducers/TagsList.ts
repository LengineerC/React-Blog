import { SAVE_TAGS_LIST, CLEAR_TAGS_LIST } from "../constants";

type Action={
    type:string,
    payload:any,
}

const initState:any=[];

export default function tagsListReducer(prevState=initState,action:Action){
    const {type,payload}=action;
    switch(type){
        case SAVE_TAGS_LIST:
            
            return payload;
        case CLEAR_TAGS_LIST:
            
            return payload;
        default:
            return prevState;
    }
}