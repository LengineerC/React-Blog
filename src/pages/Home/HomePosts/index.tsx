import { useState, useEffect } from 'react'
import { PostConfig } from '../../../utils/types';
// import store from '../../../redux/store';
import { saveSelectedPostConfig } from '../../../redux/actions';
import PostCard from '../../../components/PostCard';
import { Pagination, ConfigProvider } from 'antd';

import './index.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

type Props = {}

export default function HomePosts({}: Props) {
  // const [postList,setPostList]=useState<PostConfig[]>(store.getState().postList);
  const postList=useAppSelector(state=>state.postList);
  const [pagination,setPagination]=useState<number>(1);
  const [pageSize]=useState<number>(10);
  const [currentPage,setCurrentPage]=useState<PostConfig[]>([]);

  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode=useAppSelector(state=>state.darkMode);
  const dispatch=useAppDispatch();

  // useEffect(()=>{
  //   const {postList}=store.getState();
  //   setPostList(postList);

  //   //先从App中获取所有的页面列表，然后在此存入state
  //   const unsubscribe=store.subscribe(()=>{
  //     const {postList,darkMode}=store.getState();
  //     // console.log(postList);
      
  //     setPostList(postList);
  //     // if(darkMode!==isDarkMode){
  //       setIsDarkMode(darkMode);
  //     // }
  //   });

  //   return ()=>{
  //     unsubscribe();
  //     // console.log(store.getState().selectedPost);
  //   }
  // },[]);

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
    dispatch(saveSelectedPostConfig(selectedPost));
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

  const getPaginationTheme=()=>{
    if(!darkMode) return({
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
    });
    else return({
      token:{
        fontFamily:"CustomFont1",
        colorPrimary:"#00e80f",
        colorText:"#ffffffdd",
      },
      components:{
        Pagination:{
          itemActiveBg:"#ffffff11"
        }
      }
    })
  }

  return (
    <>
      {createPostCards()}
      <ConfigProvider
      theme={getPaginationTheme()}
      >
        <div className={darkMode?"page-options-line-dark":'page-options-line'}>
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