import Card from "../../../../../components/Card"
import { Divider } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faTag, faBookmark } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import store from "../../../../../redux/store"

import "./index.scss"
import { NavLink } from "react-router-dom"

export default function PostsInfoCard() {
  const [postsCount,setPostsCount]=useState<number>(0);
  const [tagsCount,setTagsCount]=useState<number>(0);
  const [categoriesCount,setCategoriesCount]=useState<number>(0);

  const getData=()=>{
    const {postList,tagsList,categoriesList}=store.getState();
    setPostsCount(postList.length);
    setTagsCount(Object.keys(tagsList).length);
    setCategoriesCount(Object.keys(categoriesList).length);
  }

  useEffect(()=>{
    getData();

    const unsubscribe=store.subscribe(()=>{
      getData();
    })

    return ()=>{
      unsubscribe();
    }
  },[])

  return (
    <Card
    className='aside-card' 
    scale={true}
    >
      <div className="post-info-card-main">

        <div className="post-info-card-col-1">
          <div className="post-info-card-col-header">
            <FontAwesomeIcon icon={faBook} /> 文章
          </div>
          <div className="post-info-card-col-content">
            {/* <NavLink to="/posts" > */}
              {postsCount}
            {/* </NavLink> */}
          </div>
        </div>

        <Divider type="vertical"/>

        <div className="post-info-card-col-2">
          <div className="post-info-card-col-header">
            <FontAwesomeIcon icon={faTag} /> 标签
          </div>
          <div className="post-info-card-col-content">
            <NavLink to="/tags" >
              {tagsCount}
            </NavLink>
          </div>
        </div>

        <Divider type="vertical"/>

        <div className="post-info-card-col-3">
          <div className="post-info-card-col-header">
            <FontAwesomeIcon icon={faBookmark}/> 分类
          </div>
          <div className="post-info-card-col-content">
            <NavLink to="/categories" >
              {categoriesCount}
            </NavLink>
          </div>
        </div>

      </div>
    </Card>
  )
}