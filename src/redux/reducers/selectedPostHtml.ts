import { SAVE_SELECTED_POST_HTML, CLEAR_SELECTED_POST_HTML } from "../constants";

type Action={
    type:string,
    data:string,
}

const initState='';

export default function selectedPostHtmlReducer(prevState=initState,action:Action){
    const {type,data}=action;
    switch(type){
        case SAVE_SELECTED_POST_HTML:
            return data;
        case CLEAR_SELECTED_POST_HTML:
            return data;
        default:
            return prevState;
    }
}