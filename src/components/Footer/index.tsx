import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faBilibili } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AUTHOR, WEBSITE_START_DATE, EMAIL, BILIBILI_LINK } from '../../utils/constants';
import { Popover, ConfigProvider } from 'antd';
// import { makeBadge, ValidationError } from 'badge-maker';
// import store from '../../redux/store';

import "./index.scss"
import { useAppSelector } from '../../redux/hooks';

export default function Footer() {
  const [date]=useState<Date>(new Date());
  // const [isDarkMode,setIsDarkMode]=useState<boolean>();
  const darkMode=useAppSelector(state=>state.darkMode);

  const calculateDays=()=>{
    let startDate=new Date(WEBSITE_START_DATE);
    const oneDayMs=24*60*60*1000;
    return Math.round((date.getTime()-startDate.getTime())/oneDayMs);
  }

  return (
    <footer className={darkMode?'footer-main-dark':'footer-main'}>
      <div className='footer-left-col'>
        <div className='footer-left-row'>
          <span className='footer-text-des'>
            Copyright&nbsp;©&nbsp;2024&nbsp;-&nbsp;{date.getFullYear()}&nbsp;&nbsp;
          </span>
          <span className='footer-text-value'>{AUTHOR}</span>
        </div>

        <div className='footer-left-row'>
          <span className='footer-text-des'>本站已运行:&nbsp;</span>
          <span className='footer-text-value'>
            {calculateDays()}&nbsp;天
          </span>
        </div>
        
        <div className='footer-left-row'>
          {/* <span className='footer-text-des'>row:&nbsp;</span>
          <span className='footer-text-value'>3</span> */}
          
          <span className='badge-block'>
            <a href="https://react.docschina.org/" target="_blank"> 
              <img src="https://img.shields.io/badge/Powered_by-React-green?color=%231E90FF&logo=react&style=plastic" />
            </a>
          </span>
          
          <span className='badge-block'>
            <a href="https://github.com/LengineerC" target="_blank"> 
              <img src="https://img.shields.io/badge/github-LengineerC-brightgreen?style=plastic&logo=github"/>
            </a>
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

        <Popover title={`邮箱: ${EMAIL}`}>
          <div className='footer-right-col-icon-container'>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
        </Popover>

        <Popover title={`关注我的B站${BILIBILI_LINK}`}>
          <div className='footer-right-col-icon-container'>
            <a href={BILIBILI_LINK}>
              <FontAwesomeIcon icon={faBilibili} />
            </a>
          </div>
        </Popover>
      </div>

      </ConfigProvider>
    </footer>
  )
}