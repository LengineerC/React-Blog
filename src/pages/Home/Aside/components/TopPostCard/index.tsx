import React, { ReactNode, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Card from '../../../../../components/Card'
import store from '../../../../../redux/store'
import { PostConfig } from '../../../../../utils/types'
// import axios from 'axios'
// import PostCard from '../../../HomePosts/PostCard'

import './index.scss'

const navLinkStyle={
  textDecoration:"none",
  color:"rgb(0, 20, 71)",
  fontFamily: "CustomFont1",
}

export default function TopPostCard() {
  const [topPosts,setTopPosts]=useState<PostConfig[]>([]);
  
  useEffect(() => {
    //处理axios+redux异步处理导致数据为空的问题的可能解决方案
    const { postListReducer } = store.getState();
    const filteredList = postListReducer.filter(item => item.top);
    setTopPosts(filteredList);

    const unsubscribe = store.subscribe(() => {
      const { postListReducer } = store.getState();
      const filteredList = postListReducer.filter(item => item.top);
      setTopPosts(filteredList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(()=>{
  //   console.log(topPosts);
  // },[topPosts])

  const createTopPosts=()=>{
    if(topPosts){
      return topPosts.map(item=>{
        // console.log(item);
        return (
            <NavLink key={item.id} to={`/path`} style={navLinkStyle} >
              <div className='top-post-card-link-block'>
                  🔥<span style={{color:"orange",marginRight:"10px"}}>HOT!</span>{`${item.title}`}
              </div>
            </NavLink>
        )
      })
    }
  }

  return (
    <Card scale={true} className="aside-card">
      <div className='top-post-card-main'>
        <div className='top-post-card-title'>
          👍 推荐文章
        </div>

        <hr className='hr-twill'/>

        {createTopPosts() as ReactNode}
      </div>
    </Card>
  )
}