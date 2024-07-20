import { useEffect, useState } from 'react'
import Card from '../../../../../components/Card'
import { NOTICE_CARD_TEXT } from '../../../../../utils/constants'
// import store from '../../../../../redux/store'
import { useAppSelector } from "../../../../../redux/hooks";

import './index.scss'

export default function NoticeCard() {
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode=useAppSelector(state=>state.darkMode);

  return (
    <Card 
    className='aside-card' 
    scale={true}
    bgImage={require('../../../../../assets/image/notice-card-bg.png')}
    darkMode={darkMode}
    >
      <div className='notice-card-main'>
        <div className='notice-card-header'>
          📢 公告栏
        </div>
        <hr className='hr-twill'/>
        <div className='notice-card-body'>
          <div className={darkMode?'notice-card-content-dark':'notice-card-content'}>
            {NOTICE_CARD_TEXT}
          </div>
        </div>
      </div>
    </Card>
  )
}