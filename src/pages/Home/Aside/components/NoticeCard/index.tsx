import Card from '../../../../../components/Card'

import './index.scss'

export default function NoticeCard() {
  return (
    <Card className='aside-card' scale={true}>
      <div className='notice-card-main'>
        <div className='notice-card-header'>
          📢 公告栏
        </div>
        <hr className='hr-twill'/>
        <div className='notice-card-body'>
          <div className='notice-card-content'>
            一二一二一二一二一二一二一二一二一二一二
            this is a notice. this is a notice. this is a notice. this is a notice. 
          </div>
        </div>
      </div>
    </Card>
  )
}