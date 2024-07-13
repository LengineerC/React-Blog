import { FriendUrl } from "../../utils/types";
import { SAVE_FRIENDS_URL_DATA, CLEAR_FRIENDS_URL_DATA } from "../constants";

interface Action{
    type:string,
    payload:FriendUrl[],
}

const initState:FriendUrl[]=[];

export default function friendsUrlDataReducer(prevState=initState,action:Action){
    const {type,payload}=action;
    switch(type){
        case SAVE_FRIENDS_URL_DATA:
            return payload;
        
        case CLEAR_FRIENDS_URL_DATA:
            return [];

        default:
            return prevState;
    }
}