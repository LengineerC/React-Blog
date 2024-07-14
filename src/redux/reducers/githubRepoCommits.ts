import { SAVE_GITHUB_REPO_COMMITS, CLEAR_GITHUB_REPO_COMMITS } from "../constants";

const initState:any=[];

export default function githubRepoCommitsReducer(prevState=initState,action:any){
    const {type,payload}=action;
    switch(type){
        case SAVE_GITHUB_REPO_COMMITS:
            return payload;
        
        case CLEAR_GITHUB_REPO_COMMITS:
            return [];

        default:
            return prevState;
    }
}