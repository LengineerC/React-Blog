import Card from '../../../../../components/Card'
import { NOTICE_CARD_TEXT } from '../../../../../utils/constants'

import './index.scss'

export default function NoticeCard() {
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
          <div className='notice-card-content'>
            {NOTICE_CARD_TEXT}
          </div>
        </div>
      </div>
    </Card>
  )
}