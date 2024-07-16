import { useEffect, useState } from 'react'
import Card from '../../../../../components/Card'
import { NOTICE_CARD_TEXT } from '../../../../../utils/constants'
import store from '../../../../../redux/store'

import './index.scss'

export default function NoticeCard() {
  const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);

  useEffect(()=>{
    const unsubscribe=store.subscribe(()=>{
      const {darkMode}=store.getState();
      setIsDarkMode(darkMode);
    })

    return ()=>{
      unsubscribe();
    }
  },[])

  return (
    <Card 
    className='aside-card' 
    scale={true}
    bgImage={require('../../../../../assets/image/notice-card-bg.png')}
    >
      <div className='notice-card-main'>
        <div className='notice-card-header'>
          📢 公告栏
        </div>
        <hr className='hr-twill'/>
        <div className='notice-card-body'>
          <div className={isDarkMode?'notice-card-content-dark':'notice-card-content'}>
            {NOTICE_CARD_TEXT}
          </div>
        </div>
      </div>
    </Card>
  )
}