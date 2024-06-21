import { PostConfig } from "../../utils/types";
import { CLEAR_POST_LIST, SAVE_POST_LIST } from "../constants";
// import { DataType } from "../dataType";
// import { DataType } from "../dataType";

type Action={
    type:string,
    // data?:DataType
    data:PostConfig[],
}

const initState:PostConfig[]=[];

export default function postListReducer(prevState=initState,action:Action){
    const {type,data}=action;
    switch(type){
        case SAVE_POST_LIST:
            return data ?? prevState;
        case CLEAR_POST_LIST:
            return [];
        default:
            return prevState;
    }
}