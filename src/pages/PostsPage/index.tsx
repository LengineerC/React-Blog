import { NavLink } from "react-router-dom"
import PageTitle from "../../components/PageTitle"
import TopPostCard from "../Home/Aside/components/TopPostCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag, faBookmark, } from "@fortawesome/free-solid-svg-icons"
// import { useEffect, useState } from "react"
// import store from "../../redux/store"
import { useAppSelector } from "../../redux/hooks"

import "./index.scss"

// 过渡组件，可整合进menu || 整合Aside
export default function PostsPage() {
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode=useAppSelector(state=>state.darkMode);

  // useEffect(()=>{
  //   const unsubscribe=store.subscribe(()=>{
  //     const {darkMode}=store.getState();
  //     setIsDarkMode(darkMode);
  //   });

  //   return ()=>{
  //     unsubscribe();
  //   }
  // })

  return (
    <div className="page-main">
      <div className="page-main-title">
        <PageTitle title="Posts"/>
      </div>

      <div className="page-main-content">
        <div className="posts-page-btn-line">
          <div className={darkMode?"choose-btn-dark":"choose-btn"}>
            <NavLink 
            style={{textDecoration:"none",color: `${darkMode?'#ffffffaa':'rgb(0, 20, 71)'}`,width:"100%"}} 
            to="/tags"
            >
              <FontAwesomeIcon icon={faTag}/>
            </NavLink>
          </div>

          <div className={darkMode?"choose-btn-dark":"choose-btn"}>
            <NavLink 
            style={{textDecoration:"none",color: `${darkMode?'#ffffffaa':'rgb(0, 20, 71)'}`,width:"100%"}} 
            to="/categories"
            >
              <FontAwesomeIcon icon={faBookmark}/>
            </NavLink>
          </div>
        </div>
        <TopPostCard />
      </div>
    </div>
  )
}