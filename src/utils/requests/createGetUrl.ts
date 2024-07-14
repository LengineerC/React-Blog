export default function createGetUrl(baseurl:string,path:string=""){
    let url="";
    if(baseurl[baseurl.length-1]!=='/'){
        url=baseurl+"/";
    }else{
        url=baseurl;
    }
    url+=path;
    return url;
}