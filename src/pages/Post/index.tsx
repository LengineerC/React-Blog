import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/Card';
import MDRender from '../../components/MDRender';
import store from '../../redux/store';
import { Skeleton } from 'antd';
import { PostConfig } from '../../utils/types';
import PageTitle from '../../components/PageTitle';
import { UserOutlined, ClockCircleOutlined, FileWordOutlined,CopyrightOutlined, LinkOutlined } from '@ant-design/icons';

import './index.scss'
import Tag from '../../components/Tag';
import Category from '../../components/Category';

export default function Post() {
  const {id}=useParams();
  const [markdown,SetMarkdown]=useState<string>("");
  const [postConfig,setPostConfig]=useState<PostConfig>(store.getState().selectedPostReducer as PostConfig);
  const [mdLen,setMdLen]=useState<number>(0);

  const navigate=useNavigate();

  useEffect(()=>{
    if(!id){
      navigate('/');
    }

    axios.get(`/posts/${id}.md`)
    .then(response=>{
      // console.log(response);
      SetMarkdown(response.data);
      setMdLen(response.data.length)

      const {postListReducer}=store.getState();
      let initPostConfig={} as PostConfig;
      for(let pc of postListReducer){
        if(pc.id===id){
          initPostConfig=pc;
          break;
        }
      }

      setPostConfig(initPostConfig)
    })
    .catch(err=>{
      console.log("Post: 文章获取失败",err);
      console.log(window.location.pathname);
      
      navigate(`/articles/${id}`);
    });

  },[])

  const createTags=()=>{
    if(postConfig){
      const {tags=[]}=postConfig;
      return tags.map((item,index)=>{
        return(
          <div key={index} className='post-page-card-header-symbol-tag-block'>
            <Tag tag={item} />
          </div>
        )
      })
    }
  }

  const createCategories=()=>{
    if(postConfig){
      const {categories=[]}=postConfig;
      return categories.map((item,index)=>{
        return(
          <div key={index} className='post-page-card-header-symbol-category-block'>
            <Category category={item} />
          </div>
        )
      })
    }
  }

  return (
    <div className='post-page-main'>
      {
        postConfig ?
        <>
          <div className='post-page-title'>
            <PageTitle title={postConfig.title}/>
          </div>

          <div className='post-page-body'>
            <Card>
              <div className='post-page-card-header'>
                <div className='post-page-card-header-symbol'>
                  <div className='post-page-card-header-symbol-tags'>
                    {createTags()}
                  </div>

                  <div className='post-page-card-header-symbol-categories'>
                    {createCategories()}
                  </div>
                </div>

                <div className='post-page-card-header-info'>
                  <div>
                    <span style={{fontWeight:"bolder"}}><UserOutlined/>&nbsp;作者：</span>
                    {postConfig.author}
                  </div>

                  <div>
                  <span style={{fontWeight:"bold"}}><ClockCircleOutlined/>&nbsp;发布时间：</span>
                    {postConfig.time}
                  </div>

                  <div>
                  <span style={{fontWeight:"bold"}}><FileWordOutlined />&nbsp;文章字数：</span>
                    {mdLen}
                  </div>
                </div>

              </div>
              
              <hr className='hr-twill'/>
              
              <div className='post-page-card-container'>
                <MDRender markdown={markdown} showLimitContent={false} />
              </div>

              <hr className='hr-twill'/>

              <div className='post-page-card-footer'>
                <div style={{marginBottom:"5px"}}>
                  <span style={{fontWeight:"bold"}}>
                    <LinkOutlined/>&nbsp;文章链接：
                  </span>
                  <a href={window.location.href}>{window.location.href}</a>
                </div>
                <div style={{marginBottom:"5px"}}>
                  <span style={{fontWeight:"bold"}}>
                    <CopyrightOutlined />&nbsp;版权声明：
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </>:(
          <div className='post-page-body'>
            <Card>
              <Skeleton active/>
            </Card>
          </div>
        )
      }

    </div>
  )
}