// import { PayloadType } from "../PayloadType";
import { PostConfig } from "../../utils/types";
import { SAVE_SELECTED_POST_CONFIG, CLEAR_SELECTED_POST_CONFIG } from "../constants";

type Action={
    type:string,
    // payload?:PayloadType
    payload?:PostConfig
}

const initState:PostConfig={} as PostConfig;

export default function selectedPostConfigReducer(prevState=initState,action:Action){
    const {type,payload}=action;
    
    switch(type){
        case SAVE_SELECTED_POST_CONFIG:
        return payload;
        case CLEAR_SELECTED_POST_CONFIG:
        return {};
        default:
        return prevState;
    }

}