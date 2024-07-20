import Card from "../../../../../components/Card"
import { Divider } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faTag, faBookmark } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
// import store from "../../../../../redux/store"
import { useAppSelector } from "../../../../../redux/hooks";
import { NavLink } from "react-router-dom"

import "./index.scss"

export default function PostsInfoCard() {
  // const [postsCount,setPostsCount]=useState<number>(0);
  // const [tagsCount,setTagsCount]=useState<number>(0);
  // const [categoriesCount,setCategoriesCount]=useState<number>(0);
  const postsCount=Object.keys(useAppSelector(state=>state.postList)).length;
  const tagsCount=Object.keys(useAppSelector(state=>state.tagsList)).length;
  const categoriesCount=Object.keys(useAppSelector(state=>state.categoriesList)).length;

  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode=useAppSelector(state=>state.darkMode);

  // const getData=()=>{
  //   const {postList,tagsList,categoriesList}=store.getState();
  //   setPostsCount(postList.length);
  //   setTagsCount(Object.keys(tagsList).length);
  //   setCategoriesCount(Object.keys(categoriesList).length);
  // }

  // useEffect(()=>{
  //   getData();

  //   const unsubscribe=store.subscribe(()=>{
  //     const {darkMode}=store.getState();
  //     setIsDarkMode(darkMode);
  //     getData();
  //   })

  //   return ()=>{
  //     unsubscribe();
  //   }
  // },[])

  return (
    <Card
    className='aside-card' 
    scale={true}
    darkMode={darkMode}
    >
      <div className="post-info-card-main">

        <div className="post-info-card-col-1">
          <div className={darkMode?'post-info-card-col-header-dark':"post-info-card-col-header"}>
            <FontAwesomeIcon icon={faBook} /> 文章
          </div>
          <div className={darkMode?'post-info-card-col-content-dark':"post-info-card-col-content"}>
            {/* <NavLink to="/posts" > */}
              {postsCount}
            {/* </NavLink> */}
          </div>
        </div>

        <Divider type="vertical"/>

        <div className="post-info-card-col-2">
          <div className={darkMode?'post-info-card-col-header-dark':"post-info-card-col-header"}>
            <FontAwesomeIcon icon={faTag} /> 标签
          </div>
          <div className={darkMode?'post-info-card-col-content-dark':"post-info-card-col-content"}>
            <NavLink to="/tags" >
              {tagsCount}
            </NavLink>
          </div>
        </div>

        <Divider type="vertical"/>

        <div className="post-info-card-col-3">
          <div className={darkMode?'post-info-card-col-header-dark':"post-info-card-col-header"}>
            <FontAwesomeIcon icon={faBookmark}/> 分类
          </div>
          <div className={darkMode?'post-info-card-col-content-dark':"post-info-card-col-content"}>
            <NavLink to="/categories" >
              {categoriesCount}
            </NavLink>
          </div>
        </div>

      </div>
    </Card>
  )
}