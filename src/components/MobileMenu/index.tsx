import { ConfigProvider, Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import Icon from '@ant-design/icons/lib/components/Icon'
import { MenuFoldOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

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
        <div className='menu-header'>

          <div className='menu-header-btn-line'>
          <NavLink to="/">
            <div className='menu-header-btn-block' >
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
        
        <div className='menu-body'>

          <div className='menu-body-content-container'>
            body
          </div>

        </div>
      </Drawer>
    </ConfigProvider>
  )
}