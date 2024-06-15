import React, { useEffect, useState } from 'react'
import SiteTitle from '../../components/SiteTitle'
import Card from '../../components/Card'
import PostCard from './PostCard'
// import axios from 'axios'

import { PostConfig } from '../../utils/types'

import "./index.scss"
import store from '../../redux/store'

export default function Home() {
  const [postList,setPostList]=useState<PostConfig[]>(store.getState().postListReducer);

  useEffect(()=>{
    // axios.get("/posts.json")
    // .then(response=>{
    //   console.log(response);
    //   setPostList(response.data);
    // }).catch(err=>{
    //   console.log("文章列表获取失败",err);
    // })
    // console.log(store.getState());
    
    // const unsubscribe=store.subscribe(()=>{
    const {postListReducer}=store.getState();
    setPostList(postListReducer);
    // });

    // return ()=>{
    //   unsubscribe();
    // }
  },[postList])

  // useEffect(()=>{
  //   console.log(postList);
    
  // },[postList])

  const createPostCards=()=>{
    // console.log(postList);
    
    return postList.map((item)=>{
      return(
        <PostCard config={item} key={item.id}/>
      )
    })
  }


  return (
    <>
      <SiteTitle />
      {/* <Card /> */}
      <div className='home-body'>
        <div className='home-body-left-col'>
          {createPostCards()}
        </div>
        <div className='home-body-right-col'>
          <Card/>
        </div>
      </div>
    </>
  )
}