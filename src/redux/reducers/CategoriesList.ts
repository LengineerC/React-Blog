import { CLEAR_CATEGORIES_LIST, SAVE_CATEGORIES_LIST } from "../constants";

type Action={
    type:string,
    payload:any,
}

const initState:any=[];

export default function categoriesListReducer(prevState=initState,action:Action){
    const {type,payload}=action;
    switch(type){
        case SAVE_CATEGORIES_LIST:
            return payload;

        case CLEAR_CATEGORIES_LIST:
            return payload;
            
        default:
            return prevState;
    }
}