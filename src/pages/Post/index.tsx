import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/Card';
import MDRender from '../../components/MDRender';
import store from '../../redux/store';
import { ConfigProvider, FloatButton, Skeleton, message } from 'antd';
import { PostConfig } from '../../utils/types';
import PageTitle from '../../components/PageTitle';
import { 
  UserOutlined, 
  ClockCircleOutlined, 
  FileWordOutlined,
  CopyrightOutlined, 
  LinkOutlined, 
  CopyFilled,
  UnorderedListOutlined, } from '@ant-design/icons';
import Tag from '../../components/Tag';
import Category from '../../components/Category';
import { AUTHOR, DEFAULT_SHOW_TOC } from '../../utils/constants';
import TOC from './TOC';
import { clearSelectedPostConfig, clearSelectedPostHtml } from '../../redux/actions';

import './index.scss'

export default function Post() {
  const {id}=useParams();
  const [markdown,SetMarkdown]=useState<string>("");
  const [postConfig,setPostConfig]=useState<PostConfig>(store.getState().selectedPostConfigReducer as PostConfig);
  const [mdLen,setMdLen]=useState<number>(0);
  const [showTOC,setShowTOC]=useState<boolean>(DEFAULT_SHOW_TOC);
  //显示移动端TOC Drawer
  const [showTOCDrawer,setShowTOCDrawer]=useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();
  const [url,setUrl]=useState<string>(window.location.href);

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

    //处理因锚点导致的复制链接出错的问题
    const url=window.location.href;
    const hashIndex=url.indexOf('#');
    if(hashIndex!==-1){
      const newUrl=url.substring(0,hashIndex);
      setUrl(newUrl);
    }

    return ()=>{
      store.dispatch(clearSelectedPostConfig());
      store.dispatch(clearSelectedPostHtml());
    }

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

  const copyLink=async ()=>{
    const link=url;
    try{
      await navigator.clipboard.writeText(link);
      messageApi.open({
        type:"success",
        content:"已复制到剪贴板",
      })
    }catch(e){
      message.error("复制链接出错");
      console.log("复制链接出错",e);
    }
  }

  const handleShowTOC=()=>{
    setShowTOC(!showTOC);
    setShowTOCDrawer(!showTOCDrawer);
  }

  const callbackCloseDrawer=()=>{
    setShowTOCDrawer(false);
  }

  return (
    <div className='post-page-main'>
      <ConfigProvider
      theme={{
        token:{
          colorBgElevated:"#ffffff80",
          colorFillContent:"#ffffffbb",
        },
        components:{
          Message:{
            contentBg:"#ffffffda"
          }
        }
      }}
      >
      {contextHolder}
      {
        postConfig ?
        <>
          <div className='post-page-title'>
            <PageTitle title={postConfig.title}/>
          </div>

          <div className='post-page-body'>
            <div className={showTOC?"post-page-body-content-container-showtoc":'post-page-body-content-container'}>
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
              
              <div className={'post-page-card-container'}>
                <MDRender markdown={markdown} showLimitContent={false} />
              </div>

              <hr className='hr-twill'/>

              <div className='post-page-card-footer'>
                <div style={{marginBottom:"5px"}}>
                  <span style={{fontWeight:"bold"}}>
                    <LinkOutlined/>文章链接：
                    <CopyFilled className='copy-button' onClick={copyLink}/>
                  </span>
                  <a href={url}>{url}</a>
                </div>
                <div style={{marginBottom:"5px"}}>
                  <span style={{fontWeight:"bold"}}>
                    <CopyrightOutlined />
                    版权声明：本博客所有文章除特別声明外，均采用 <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a> 许可协议。转载请注明来源 <a href='/'>{AUTHOR}</a> !
                  </span>
                </div>
              </div>
            </Card>
            </div>
            
            <div 
            className='toc-container' 
            style={showTOC?{}:{display:"none"}}
            >
              <TOC 
              showDrawer={showTOCDrawer} 
              markdown={markdown}
              callbackOnClose={callbackCloseDrawer}
              />
            </div>
          </div>
        </>:(
          <div className='post-page-body'>
            <Card>
              <Skeleton active/>
            </Card>
          </div>
        )
      }
        <FloatButton 
        className='toc-btn' 
        icon={<UnorderedListOutlined/>}
        onClick={handleShowTOC}
        />
      </ConfigProvider>
    </div>
  )
}