import { CLEAR_CATEGORIES_LIST, SAVE_CATEGORIES_LIST } from "../constants";

type Action={
    type:string,
    data:any,
}

const initState:any=[];

export default function categoriesListReducer(prevState=initState,action:Action){
    const {type,data}=action;
    switch(type){
        case SAVE_CATEGORIES_LIST:
            return data;
        case CLEAR_CATEGORIES_LIST:
            return data;
        default:
            return prevState;
    }
}