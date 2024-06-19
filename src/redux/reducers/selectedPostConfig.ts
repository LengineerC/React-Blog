// import { DataType } from "../dataType";
import { PostConfig } from "../../utils/types";
import { SAVE_SELECTED_POST_CONFIG, CLEAR_SELECTED_POST_CONFIG } from "../constants";

type Action={
    type:string,
    // data?:DataType
    data?:PostConfig
}

const initState:PostConfig | null=null;

export default function selectedPostConfigReducer(prevState=initState,action:Action){
    const {type,data}=action;
    switch(type){
        case SAVE_SELECTED_POST_CONFIG:
        return data;
        case CLEAR_SELECTED_POST_CONFIG:
        return null;
        default:
        return prevState;
    }

}