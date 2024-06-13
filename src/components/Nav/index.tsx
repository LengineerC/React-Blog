import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import store from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBook, faFileZipper,faLink, faAddressCard, faMusic, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { darkmodeOFF, darkmodeON } from '../../redux/actions';
import { MoonFilled, SunFilled } from '@ant-design/icons';

import "./index.scss";

type Props = {}

//Nav内容块列宽度显示
const show_border={
  // border:"2px solid black",
  border:"none",
}

export default function Nav({}: Props) {
  const [visible,setVisible]=useState<boolean>(store.getState().navSwitchReducer);
  // const [lastScrollTop,setLastScrollTop]=useState<number>(0);
  const [isDarkMode,setIsDarkMode]=useState<boolean>(false);
  const [navTransparent,setNavTransparent]=useState<boolean>(true);
  const [showSubMenu,setShowSubMenu]=useState<string|null>(null);

  // const handleScroll=()=>{
  //   let currentScrollTop=window.scrollY || document.documentElement.scrollTop;
  //   let scrollStep = currentScrollTop - lastScrollTop;
  //   setLastScrollTop(currentScrollTop);

  //   if(scrollStep<0){
  //       setVisible(false);
  //     }else{
  //       setVisible(true);
  //     }
  //   // setLastScrollTop(currentScrollTop <= lastScrollTop ? lastScrollTop : currentScrollTop);
  // }

  //原处理方法state异步更新导致bug
  let lastScrollTop=0;
  const handleScroll = () => {
    let clientHeight = document.documentElement.clientHeight //可视区域高度
    let scrollTop = document.documentElement.scrollTop; //滚动条滚动高度
    let scrollHeight = document.documentElement.scrollHeight; //滚动内容高度
    // console.log("scrollTop", scrollTop, 'lastScrollY', lastScrollTop, 'clientHeight', clientHeight, 'scrollHeight', scrollHeight);
    if (scrollTop <= lastScrollTop) {
      setVisible(true)
    } else {
      setVisible(false)
    }
    lastScrollTop = document.documentElement.scrollTop
    // 判断是否滚动到底部
    if (scrollTop + clientHeight === scrollHeight) {
      console.log("滚动到底部");
    }
  }


  const checkScrollTop=()=>{
    if(window.scrollY<10){
      setNavTransparent(true);
    }else{
      setNavTransparent(false);
    }
  }

  const handleMouseEnter=(menu:string)=>{
    setShowSubMenu(menu);
  }

  const handleMouseLeave=()=>{
    setShowSubMenu(null);
  }

  const changeDarkMode=()=>{
    const {darkModeReducer}=store.getState();
    if(darkModeReducer){
      store.dispatch(darkmodeOFF());
    }else{
      store.dispatch(darkmodeON());
    }
  }

  //订阅监听夜间模式切换和滚动事件修改样式
  useEffect(()=>{
    store.subscribe(()=>{
      const {darkModeReducer}=store.getState();
      setIsDarkMode(darkModeReducer);
    });

    window.addEventListener("scroll",handleScroll);
    window.addEventListener("scroll",checkScrollTop);

    return ()=>{
      window.removeEventListener("scroll",handleScroll);
      window.removeEventListener("scroll",checkScrollTop);
    }
  },[])

  //nav显示状态和redux绑定
  useEffect(()=>{
    // console.log(store.getState());
    store.subscribe(()=>{
      const {navSwitchReducer}=store.getState();
      // console.log(store.getState());
      
      if(navSwitchReducer!==visible){
        setVisible(navSwitchReducer);
      }
    });
  },[visible])

  return (
    <nav className={`nav ${!visible?'hidden-nav':''} ${navTransparent?"nav-transparent":''}`}>
      <Row>
        <Col 
        span="8" 
        className='nav-content-container' 
        style={show_border}
        >
          <NavLink to="/">
            <div className='click-container' style={{width:"160px"}}>
              <FontAwesomeIcon icon={faHouse} />
            </div>
          </NavLink>
        </Col>

        {/*用于间隔*/}
        {/* <Col 
        span="1"
        style={show_border}
        >
        </Col> */}

        <Col className='nav-center-col' flex={1} span={8}>
        
        <div 
        className='nav-content-container' 
        onMouseEnter={()=>handleMouseEnter("articles")}
        onMouseLeave={handleMouseLeave}
        style={show_border}
        >
          <NavLink to="articles">
            <div 
            className='click-container'
            >
              <FontAwesomeIcon icon={faBook} />
              <div className='nav-click-text-container'>
                文章
                <span className='nav-click-text-icon'>
                  {
                    showSubMenu?
                    <FontAwesomeIcon icon={faAngleUp} />
                    :<FontAwesomeIcon icon={faAngleDown} />
                  }
                </span>
              </div>
            </div>
          </NavLink>
          {
            showSubMenu==="articles" && (
              <div className='sub-menu'>
                <div className='sub-menu-item'>
                  item1
                </div>
                <div className='sub-menu-item'>
                  item2
                </div>
              </div>
            )
          }
        </div>

        <div 
        className='nav-content-container' 
        style={show_border}
        // push={1}
        >
          <NavLink to="archives">
            <div className='click-container'>
              <FontAwesomeIcon icon={faFileZipper} />
              <div className='nav-click-text-container'>
                归档
              </div>
            </div>
          </NavLink>
        </div>

        <div 
        className='nav-content-container' 
        style={show_border}
        // push={1}
        >
          <NavLink to="media">
            <div className='click-container'>
              <FontAwesomeIcon icon={faMusic} />
              <div className='nav-click-text-container'>
                媒体
              </div>
            </div>
          </NavLink>
        </div>

        <div
        className='nav-content-container' 
        style={show_border}
        
        // push={1}
        >
          <NavLink to="friends">
            <div className='click-container'>
              <FontAwesomeIcon icon={faLink} />
              <div className='nav-click-text-container'>
                友链
              </div>
            </div>
          </NavLink>
        </div>

        <div 
        className='nav-content-container' 
        style={show_border}
        // push={1}
        >
          <NavLink to="about">
            <div className='click-container'>
              <FontAwesomeIcon icon={faAddressCard} />
              <div className='nav-click-text-container'>
                关于
              </div>
            </div>
          </NavLink>
        </div>
        </Col>

        <Col 
        span="8"
        className='nav-content-container'
        // push={1}
        style={show_border}
        >
          <div className='nav-tool-click-container' onClick={changeDarkMode}>
            {!isDarkMode?<MoonFilled />:<SunFilled />}
          </div>
        </Col>

      </Row>
    </nav>
  )
}