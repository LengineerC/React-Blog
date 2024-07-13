import { PostConfig } from "../../utils/types";
import { CLEAR_POST_LIST, SAVE_POST_LIST } from "../constants";
// import { payloadType } from "../payloadType";
// import { payloadType } from "../payloadType";

type Action={
    type:string,
    // payload?:payloadType
    payload:PostConfig[],
}

const initState:PostConfig[]=[];

export default function postListReducer(prevState=initState,action:Action){
    const {type,payload}=action;
    switch(type){
        case SAVE_POST_LIST:
            return payload ?? prevState;
        case CLEAR_POST_LIST:
            return [];
        default:
            return prevState;
    }
}