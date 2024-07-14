import {all} from "redux-saga/effects"
import { watchGetGithubRepoCommits } from "./githubData"

export default function *watchRoot(){
    yield all([
        watchGetGithubRepoCommits(),
    ])
}