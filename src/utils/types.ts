//post文件配置
export type PostConfig={
    id:string,
    title:string,
    author:string,
    time:string,
    lock:boolean,
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