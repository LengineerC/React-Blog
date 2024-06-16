import { DataType } from "../dataType";
import { PostConfig } from "../../utils/types";
import { SAVE_SELECTED_POST, CLEAR_SELECTED_POST } from "../constants";

type Action={
    type:string,
    data?:DataType
}

const initState:PostConfig | null=null;

export default function selectedPostReducer(prevState=initState,action:Action){
    const {type,data}=action;
    switch(type){
        case SAVE_SELECTED_POST:
        return data;
        case CLEAR_SELECTED_POST:
        return null;
        default:
        return prevState;
    }

}