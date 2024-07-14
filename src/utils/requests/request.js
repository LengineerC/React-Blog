import axios from "axios";

export default function request(url,option={}){
    const {method,params}=option;
    if(method==='GET'){
        return axios.get(
            url,{
                params:{...params},
            }
        ).then(response=>{
            return response;
        }).catch(err=>{
            console.log(err);
        })

    }else if(method==="POST"){
        return axios.post(
            url,
            params
        ).then(response=>{
            return response;
        }).catch(err=>{
            console.log(err);
        })
    }
}