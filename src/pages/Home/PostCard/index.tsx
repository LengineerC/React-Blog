import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Card from '../../../components/Card'
import { PostConfig } from '../../../utils/types'
import marked from 'marked'

import './index.scss'
import MDRender from '../../../components/MDRender'

type Props = {
  config:PostConfig,
}

export default function PostCard({config}: Props) {
  const [postConfig,setPostConfig]=useState<PostConfig>(config);
  const [postTitle,setPostTitle]=useState<string>("");
  const [markdown,SetMarkdown]=useState<string>("");

  useEffect(()=>{
    // console.log(postConfig);
    const {title,author,time,path,lock}=postConfig;
    axios.get(path)
    .then(response=>{
      // console.log(response);
      setPostTitle(title)
      SetMarkdown(response.data);
      
    })
    .catch(err=>{
      console.log(`文章获取失败: ${path}`,err);
      
    })
  },[postConfig])

  return (
    <NavLink to={`/post`} style={{textDecoration:"none"}}>
      <Card
      scale={true}
      >
        <div className='post-card-main'>
            
          <div className='post-card-title'>
            {postTitle}
          </div>

          <hr/>

          <div className='post-card-content'>
            <MDRender markdown={markdown} showLimitContent={false}/>
          </div>

          <div className='post-card-footer'>
            <div>
              tag1
            </div>
            
            <div>
              tag2
            </div>
          </div>

        </div>
      </Card>

    </NavLink>
  )
}