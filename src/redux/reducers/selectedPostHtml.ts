import { SAVE_SELECTED_POST_HTML, CLEAR_SELECTED_POST_HTML } from "../constants";

type Action={
    type:string,
    payload:string,
}

const initState='';

export default function selectedPostHtmlReducer(prevState=initState,action:Action){
    const {type,payload}=action;
    switch(type){
        case SAVE_SELECTED_POST_HTML:
            return payload;
        case CLEAR_SELECTED_POST_HTML:
            return payload;
        default:
            return prevState;
    }
}