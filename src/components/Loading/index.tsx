import React, { useEffect } from 'react'
import store from '../../redux/store'
import { hideNav, showNav } from '../../redux/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import "./index.scss"

export default function Loading() {
  useEffect(()=>{
    store.dispatch(hideNav());

    return()=>{
      store.dispatch(showNav());
    }
  },[])

  return (
    <div className='loading-main'>
      <div className='loading-icon'>
        <FontAwesomeIcon icon={faSpinner}/>
      </div>
      <div className='loading-title'>
        Loading...
      </div>
    </div>
  )
}