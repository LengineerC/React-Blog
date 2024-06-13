import React from 'react'
import { SITE_TITLE } from '../../utils/constants'

import './index.scss'

type Props = {}

export default function SiteTitle({}: Props) {
  return (
    <div className={"title-box"}>
        <div className={"title"}>
            {SITE_TITLE}
        </div>
    </div>
  )
}