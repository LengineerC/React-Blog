import { ConfigProvider, Drawer } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { MenuFoldOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBook, faFileZipper,faLink, faAddressCard, faMusic } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom'
import store from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';

import './index.scss'

type Props = {
  open:boolean,
  handleMenuClose:Function,
}

const custom_menu_fold_outlined={
  fontSize:"25px",
  color:"#fff"
}

export default function MobileMenu({open,handleMenuClose}: Props) {
  const [_open,setOpen]=useState<boolean>(open);
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode=useAppSelector(state=>state.darkMode);
  const colorBgElevatedRef=useRef<string>('#ffffffdd');

  // useEffect(()=>{
  //   const unsubscribe=store.subscribe(()=>{
  //     const {darkMode}=store.getState();
  //     setIsDarkMode(darkMode);
  //     colorBgElevatedRef.current=darkMode?'#30307a99':'#ffffffdd';
  //   })

  //   return ()=>{
  //     unsubscribe();
  //   }
  // },[])
  const changeColorBgElevatedRef=()=>{
    colorBgElevatedRef.current=darkMode?'#30307a99':'#ffffffdd';
  }

  useEffect(()=>{
    changeColorBgElevatedRef();
  },[darkMode])

  useEffect(()=>{
    setOpen(open);
  },[open])

  const onClose=()=>{
    setOpen(false);
    handleMenuClose();
  }

  return (
    <ConfigProvider
    theme={{
      token:{
        padding:0,
        paddingLG:0,
        paddingXS:0,
        colorBgElevated:colorBgElevatedRef.current
      }
    }}
    >
      <Drawer
      className='custom-drawer'
      open={_open}
      placement='left'
      width={250}
      // destroyOnClose
      onClose={onClose}
      // closeIcon={<MenuFoldOutlined style={custom_menu_fold_outlined}/>}
      closeIcon={null}
      >
        <div className={darkMode?"menu-header-dark":'menu-header'}>

          <div className='menu-header-btn-line'>
          <NavLink to="/">
            <div className='menu-header-btn-block' onClick={onClose}>
              <FontAwesomeIcon style={custom_menu_fold_outlined} icon={faHouse} />
            </div>
          </NavLink>

            <div className='menu-header-btn-block' onClick={onClose}>
              <MenuFoldOutlined style={custom_menu_fold_outlined} />
            </div>
          </div>

          <div className='menu-header-title'>
            q(≧▽≦q)
          </div>

          <div className='menu-header-subtitle'>
            Welcome to my blog!
          </div>

        </div>
        
        <div className={darkMode?'menu-body-dark':'menu-body'}>
          <div onClick={onClose}>

            <NavLink to="posts">
              <div className={darkMode?'menu-body-content-container-dark':'menu-body-content-container'}>
              <span className='icon-block'>
                <FontAwesomeIcon style={darkMode?{color:"#ffffffdd"}:{}} icon={faBook}/>

              </span>
                <span>文章</span>
                <span className="menu-body-content-container-extend">&nbsp;</span>
              </div>
            </NavLink>
            
            <NavLink to="archives">
              <div className={darkMode?'menu-body-content-container-dark':'menu-body-content-container'}>
              <span className='icon-block'>
                <FontAwesomeIcon style={darkMode?{color:"#ffffffdd"}:{}} icon={faFileZipper}/>

              </span>
                <span>归档</span>
                <span className="menu-body-content-container-extend">&nbsp;</span>
              </div>
            </NavLink>
            
            <NavLink to="media">
              <div className={darkMode?'menu-body-content-container-dark':'menu-body-content-container'}>
              <span className='icon-block'>
                <FontAwesomeIcon style={darkMode?{color:"#ffffffdd"}:{}} icon={faMusic}/>

              </span>
                <span>媒体</span>
                <span className="menu-body-content-container-extend">&nbsp;</span>
              </div>
            </NavLink>

            <NavLink to="friends">
              <div className={darkMode?'menu-body-content-container-dark':'menu-body-content-container'}>
              <span className='icon-block'>
                <FontAwesomeIcon style={darkMode?{color:"#ffffffdd"}:{}} icon={faLink}/>

              </span>
                <span>友链</span>
                <span className="menu-body-content-container-extend">&nbsp;</span>
              </div>
            </NavLink>

            <NavLink to="about">
              <div className={darkMode?'menu-body-content-container-dark':'menu-body-content-container'}>
              <span className='icon-block'>
                <FontAwesomeIcon style={darkMode?{color:"#ffffffdd"}:{}} icon={faAddressCard}/>

              </span>
                <span>关于</span>
                <span className="menu-body-content-container-extend">&nbsp;</span>
              </div>
            </NavLink>
          </div>

        </div>
      </Drawer>
    </ConfigProvider>
  )
}