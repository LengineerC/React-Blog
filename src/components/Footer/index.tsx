import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AUTHOR, WEBSITE_START_DATE } from '../../utils/constants';
import { Popover, ConfigProvider } from 'antd';

import "./index.scss"

export default function Footer() {
  const [date,setDate]=useState<Date>(new Date());

  const calculateDays=()=>{
    let startDate=new Date(WEBSITE_START_DATE);
    const oneDayMs=24*60*60*1000;
    return Math.round((date.getTime()-startDate.getTime())/oneDayMs);
  }

  // const githubPopoverContent=(
  //   <div className='poover-container'>
  //     <p>123</p>
  //   </div>
  // ) 

  return (
    <footer className='footer-main'>
      <div className='footer-left-col'>
        <div className='footer-left-row'>
          <span className='footer-text-des'>
            Copyright&nbsp;©&nbsp;2024&nbsp;-&nbsp;{date.getFullYear()}&nbsp;&nbsp;
          </span>
          <span className='footer-text-value'>{AUTHOR}</span>
        </div>

        <div className='footer-left-row'>
          <span className='footer-text-des'>row:&nbsp;</span>
          <span className='footer-text-value'>2</span>
        </div>
        <div className='footer-left-row'>
          <span className='footer-text-des'>本站已运行:&nbsp;</span>
          <span className='footer-text-value'>
            {calculateDays()}&nbsp;天
          </span>
        </div>
      </div>

      <ConfigProvider
      theme={{
        token:{
          colorBgElevated:"#ffffffbb",
          lineHeight:0.1,
          fontFamily:"CustomFont1",
        },
        components:{
          Popover:{
            titleMinWidth:10,
          }
        }
      }}
      >

      <div className='footer-right-col'>
        <Popover title="访问网站github仓库">
          <div className='footer-right-col-icon-container'>
            <a href='https://github.com/LengineerC/React-Blog'>
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </Popover>

        <Popover title="邮箱: lengineerc@outlook.com">
          <div className='footer-right-col-icon-container'>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
        </Popover>
      </div>

      </ConfigProvider>
    </footer>
  )
}