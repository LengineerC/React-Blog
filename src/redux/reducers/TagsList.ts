import { SAVE_TAGS_LIST, CLEAR_TAGS_LIST } from "../constants";

type Action={
    type:string,
    data:any,
}

const initState:any=[];

export default function tagsListReducer(prevState=initState,action:Action){
    const {type,data}=action;
    switch(type){
        case SAVE_TAGS_LIST:
            return data;
        case CLEAR_TAGS_LIST:
            return data;
        default:
            return prevState;
    }
}