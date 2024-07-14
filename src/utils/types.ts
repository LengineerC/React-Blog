//post文件配置
export type PostConfig={
    id:string,
    title:string,
    author:string,
    time:string,
    lock:boolean,
    password:string,
    path:string,
    top?:boolean,
    categories?:[],
    tags?:[],
};

// Nav菜单配置
export type MenuConfig={
    name:string,
    path:string,
    key:string,
    clickable:boolean,
    options:{
      subMenuEnable:boolean,
      subItems:JSX.Element[],
    }
}

// 友链json格式
export type FriendUrl={
  url:string,
  avatar:string,
  title:string,
  description:string,
}