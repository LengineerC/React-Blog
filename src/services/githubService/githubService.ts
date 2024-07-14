import { GetRepoCommitsPayload } from "./type";
import { githubBaseUrl } from "../../utils/requests/ip";
import createGetUrl from "../../utils/requests/createGetUrl";
import request from "../../utils/requests/request";

export function getRepoCommits(payload:GetRepoCommitsPayload){
    return request(createGetUrl(githubBaseUrl,`repos/${payload.owner}/${payload.repo}/commits`),{
        method:"GET",
        params:{},
   });
}