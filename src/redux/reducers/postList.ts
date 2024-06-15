import { CLEAR_POST_LIST, SAVE_POST_LIST } from "../constants";
import { DataType } from "../dataType";

type Action={
    type:string,
    data?:DataType
}

const initState:any=[];

export default function postListReducer(prevState=initState,action:Action){
    const {type,data}=action;
    switch(type){
        case SAVE_POST_LIST:
            return data;
        case CLEAR_POST_LIST:
            return data;
        default:
            return prevState;
    }
}