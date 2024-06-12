import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import store from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBook, faFileZipper,faLink, faAddressCard, faMusic } from '@fortawesome/free-solid-svg-icons';
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
  const [lastScrollTop,setLastScrollTop]=useState<number>(0);
  const [isDarkMode,setIsDarkMode]=useState<boolean>(false);

  const handleScroll=()=>{
    let currentScrollTop=window.scrollY || document.documentElement.scrollTop;

    if(currentScrollTop>lastScrollTop){
      setVisible(false);
    }else{
      setVisible(true);
    }
  }

  const changeDarkMode=()=>{
    const {darkModeReducer}=store.getState();
    if(darkModeReducer){
      store.dispatch(darkmodeOFF());
    }else{
      store.dispatch(darkmodeON());
    }
  }

  //订阅监听夜间模式
  useEffect(()=>{
    store.subscribe(()=>{
      const {darkModeReducer}=store.getState();
      setIsDarkMode(darkModeReducer);
    })
  },[])

  useEffect(()=>{
    window.addEventListener("scroll",handleScroll);

    return ()=>{window.removeEventListener("scroll",handleScroll)}
  },[lastScrollTop])

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
    <nav className={`nav ${!visible?'hidden-nav':''}`}>
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
        <Col 
        span="1"
        style={show_border}
        >
        </Col>

        <Col 
        className='nav-content-container' 
        style={show_border}
        // push={1}
        >
          <NavLink to="articles">
            <div className='click-container'>
              <FontAwesomeIcon icon={faBook} />
              <div className='nav-click-text-container'>
                文章
              </div>
            </div>
          </NavLink>
        </Col>

        <Col 
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
        </Col>

        <Col 
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
        </Col>

        <Col 
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
        </Col>

        <Col 
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
        </Col>

        <Col 
        span="1"
        className='nav-content-container'
        push={3}
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