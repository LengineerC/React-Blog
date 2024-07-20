// import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/PageTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useLocation } from 'react-router-dom'
// import { MOBILE_MAX_WIDTH } from '../../utils/constants'
import Card from '../../components/Card'
import { useAppSelector } from '../../redux/hooks'

import './index.scss'

export default function ErrorPage() {
  const location=useLocation();
  const fromPath=location.state?.from || location.pathname;
  const darkMode=useAppSelector(state=>state.darkMode);

  const createXmark=(n:number)=>{
    return Array.from({length:n},(_,index)=>(
      <div className='xmark-block' key={index}>
        <FontAwesomeIcon icon={faXmark}/>
      </div>
    ))
  }

  return (
    <div className='page-main'>
      <div className='page-main-title'>
        <PageTitle title='404 ERROR'/>
      </div>

      <div className='page-main-content'>
        
        <div className='xmark-line'>
          {/* {isMobile?createXmark(10):createXmark(20)} */}
          {createXmark(10)}
        </div>
        <Card darkMode={darkMode}>

        <div className='error-info-block'>
          <div style={{marginRight:"5px"}}><FontAwesomeIcon icon={faCircleExclamation}/>&nbsp;ErrorInfo:</div>
          <div style={{fontStyle:"italic"}}>
            path "{fromPath}" not found!
          </div>
        </div>

        <div className='return-btn-block'>
          <NavLink to="/" style={{textDecoration:"none"}}>
            <div className='return-click-block'>
              RETURN
            </div>
          </NavLink>
        </div>

        </Card>
      </div>
    </div>
  )
}