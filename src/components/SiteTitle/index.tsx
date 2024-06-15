import { SITE_TITLE } from '../../utils/constants'
import Hitokoto from '../Hitokoto'
import { SUB_TITLE_ENABLE } from '../../utils/constants'

import './index.scss'

type Props = {}

export default function SiteTitle({}: Props) {
  return (
    <div className={"site-title-box"}>
        <div className={"site-title"}>
            {SITE_TITLE}
        </div>
        {
          SUB_TITLE_ENABLE &&
          <div className='site-sub-title'>
          <Hitokoto />
        </div>
        }
    </div>
  )
}