// import React from 'react'
import { FloatButton, ConfigProvider } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

// import "./index.scss"

export default function Top() {
  return (
    <ConfigProvider
    theme={{
      token:{
        colorBgElevated:"#ffffff7b",
      }
    }}
    >

    <FloatButton.BackTop 
      icon={<FontAwesomeIcon icon={faArrowUp}/>}
      />
      </ConfigProvider>
  )
}