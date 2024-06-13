// import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/PageTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useLocation } from 'react-router-dom'
// import { MOBILE_MAX_WIDTH } from '../../utils/constants'

import './index.scss'
import Card from '../../components/Card'

export default function ErrorPage() {
  // const [isMobile,setIsMobile]=useState<boolean>(true);

  // const handleResize=()=>{
  //   setIsMobile((window.innerWidth<=MOBILE_MAX_WIDTH)?true:false);
  // }

  // useEffect(()=>{
  //   window.addEventListener("resize",handleResize);
    
  //   return()=>{
  //     window.removeEventListener("resize",handleResize);
  //   }
  // },[])
  const location=useLocation();

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
        <Card>

        <div className='error-info-block'>
          <div style={{marginRight:"5px"}}><FontAwesomeIcon icon={faCircleExclamation}/>&nbsp;ErrorInfo:</div>
          <div style={{fontStyle:"italic"}}>
            path "{location.pathname}" not found!
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