// import { useEffect, useState } from 'react'
import { FloatButton, ConfigProvider } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
// import store from '../../redux/store';

// import "./index.scss"
type Props={
  darkMode:boolean
}

export default function Top({darkMode}:Props) {
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(false);

  // useEffect(()=>{
  //   const {darkMode}=store.getState();
  //   setIsDarkMode(darkMode);

  //   const unsubscribe=store.subscribe(()=>{
  //     const {darkMode}=store.getState();
  //     setIsDarkMode(darkMode);
  //   });

  //   return()=>{
  //     unsubscribe();
  //   }
  // },[])

  const getToken=(isDarkMode:boolean)=>{
    let colorBgElevated=isDarkMode?'#46466c7b':'#ffffff7b';
    let colorFillContent=isDarkMode?'#686894bb':'#ffffffbb';
    let colorText='#ffffff99';
    let token:any={
      colorBgElevated,
      colorFillContent
    };
    if(isDarkMode){
      if(!token.hasOwnProperty('colorText')){
        token['colorText']=colorText;
      }
    }
    return token;
  }

  return (
    <div>
      <ConfigProvider
      theme={{
        // token:{
        //   colorBgElevated:"ffffff7b",
        //   colorFillContent:"#ffffffbb",
        // }
        token:getToken(darkMode)
      }}
      >

      <FloatButton.BackTop 
      icon={<FontAwesomeIcon icon={faArrowUp}/>}
      shape='square'
      />
      </ConfigProvider>
    </div>
  )
}