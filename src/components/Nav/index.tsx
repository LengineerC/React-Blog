import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import store from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import "./index.scss";

type Props = {}

export default function Nav({}: Props) {
  const [visible,setVisible]=useState<boolean>(store.getState().navSwitchReducer);
  const [lastScrollTop,setLastScrollTop]=useState<number>(0);

  const handleScroll=()=>{
    let currentScrollTop=window.scrollY || document.documentElement.scrollTop;

    if(currentScrollTop>lastScrollTop){
      setVisible(false);
    }else{
      setVisible(true);
    }
  }

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
        <Col span="10" className='nav-content-container'>
          <NavLink to="/">
            <div className='click-container'>
              <FontAwesomeIcon icon={faHouse} />
            </div>
          </NavLink>
        </Col>
      </Row>
    </nav>
  )
}