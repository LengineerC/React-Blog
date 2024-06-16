import { useState, useEffect } from 'react'
import { PostConfig } from '../../../utils/types';
import store from '../../../redux/store';
import { saveSelectedPost } from '../../../redux/actions';
import PostCard from './PostCard';
import { Pagination, ConfigProvider } from 'antd';

import './index.scss';

type Props = {}

export default function HomePosts({}: Props) {
  const [postList,setPostList]=useState<PostConfig[]>(store.getState().postListReducer);
  const [pagination,setPagination]=useState<number>(1);
  const [pageSize]=useState<number>(10);
  const [currentPage,setCurrentPage]=useState<PostConfig[]>([]);

  useEffect(()=>{
    //先从App中获取所有的页面列表，然后在此存入state
    const unsubscribe=store.subscribe(()=>{
      const {postListReducer}=store.getState();
      // console.log(postListReducer);
      
      setPostList(postListReducer);
    });

    return ()=>{
      unsubscribe();
      // console.log(store.getState().selectedPostReducer);
    }
  },[]);
  // useEffect(()=>{
  //   console.log(postList);
    
  // },[postList])

  useEffect(()=>{
    if(postList.length!==0){
      let slicedPage=[...postList];
      slicedPage=slicedPage.slice((pagination-1)*pageSize,pagination*pageSize);
      // console.log(slicedPage);
      
      setCurrentPage(slicedPage);
    }

  },[pagination,postList])

  const setSelectedPost=(selectedPost:PostConfig)=>{
    // console.log(selectedPost);
    store.dispatch(saveSelectedPost(selectedPost));
  }

  const createPostCards=()=>{
    // console.log("postlist",postList);
    // console.log("currentPage",currentPage);
    
    return currentPage.map((item)=>{
      return(
        <div 
        style={{width:"100%",marginBottom:"3vh"}} 
        onClick={()=>setSelectedPost(item)}
        key={item.id}
        >
          <PostCard 
          config={item} 
          key={item.id}
          limit={250} 
          showLimitContent={true}
          />
        </div>
      )
    })
  }

  const onChange=(page:number)=>{
    // console.log(`page: ${page}`);
    // console.log(`pageSize: ${pageSize}`);
    setPagination(page);
  }

  return (
    <>
      {createPostCards()}
      <ConfigProvider
      theme={{
        token:{
          fontFamily:"CustomFont1",
          colorPrimary:"#67abff",
          colorText:"#001447",
        },
        components:{
          Pagination:{
            itemActiveBg:"#ffffff11"
          }
        }
      }}
      >
        <div className='page-options-line'>
          <Pagination 
          total={postList.length}
          showTotal={(total)=>`共 ${total} 篇文章`}
          defaultCurrent={pagination}
          defaultPageSize={pageSize}
          onChange={(page)=>onChange(page)}
          showSizeChanger={false}
          />
        </div>
      </ConfigProvider>
    </>
  )
}