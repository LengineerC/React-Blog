import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import store from "../../redux/store";
import PostCard from "../../components/PostCard";
import { saveSelectedPostConfig } from "../../redux/actions";
import { PostConfig } from "../../utils/types";

import './index.scss'

export default function TagDetail() {
  const {tag}=useParams();
  const [tagsDetail,setTagsDetail]=useState<PostConfig[]>();

  useEffect(()=>{
    const {tagsListReducer}=store.getState();
    setTagsDetail(tagsListReducer[tag as string]);

    const unsubscribe=store.subscribe(()=>{
      const {tagsListReducer}=store.getState();
      setTagsDetail(tagsListReducer[tag as string]);
    })

    return ()=>{
      unsubscribe();
    }

  },[tag])

  const setSelectedPost=(selectedPost:PostConfig)=>{
    // console.log(selectedPost);
    store.dispatch(saveSelectedPostConfig(selectedPost));
  }

  const createPostCards=()=>{
    if(tagsDetail && tagsDetail.length>0){
      return tagsDetail.map((post)=>{
        return(
          <div 
          style={{width:"100%",marginBottom:"3vh"}} 
          onClick={()=>setSelectedPost(post)}
          key={post.id}
          >
            <PostCard 
            config={post} 
            key={post.id}
            limit={250} 
            showLimitContent={true}
            />
          </div>
        )
      })
    }

  }

  return (
    <div className="page-main">
      <div className="page-main-title">
        <PageTitle title={tag as string}/>
      </div>

      <div className="page-main-content">
        {createPostCards()}
      </div>
    </div>
  )
}