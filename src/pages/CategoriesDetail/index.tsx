import { useParams } from "react-router-dom"
import PageTitle from "../../components/PageTitle"
import { useEffect, useState } from "react";
import store from "../../redux/store";
import { PostConfig } from "../../utils/types";
import { saveSelectedPostConfig } from "../../redux/actions";
import PostCard from "../../components/PostCard";

import "./index.scss"

export default function CategoriesDetail() {
  const {category}=useParams();
  const [categoriesDetail,setCategoriesDetail]=useState<PostConfig[]>();

  useEffect(()=>{
    const {categoriesListReducer}=store.getState();
    setCategoriesDetail(categoriesListReducer[category as string]);

    const unsubscribe=store.subscribe(()=>{
      const {categoriesListReducer}=store.getState();
      setCategoriesDetail(categoriesListReducer[category as string]);
    })

    return ()=>{
      unsubscribe();
    }
  },[category])

  const setSelectedPost=(post:PostConfig)=>{
    store.dispatch(saveSelectedPostConfig(post));
  }

  const createPostCards=()=>{
    if(categoriesDetail && categoriesDetail.length>0){
      return categoriesDetail.map((post:PostConfig)=>{
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
        <PageTitle title={category as string}/>
      </div>

      <div className="page-main-content">
        {createPostCards()}
      </div>
    </div>
  )
}