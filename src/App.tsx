import React, {useEffect, useState} from 'react'
import './App.scss';
import Nav from './components/Nav';
import Main from './components/Main';
import store from './redux/store';
import { MenuOutlined, SunFilled, MoonFilled } from '@ant-design/icons';

//nav hidden test
// import { showNav, hideNav } from './redux/actions';
import { MOBILE_MAX_WIDTH } from './utils/constants';
import { darkmodeOFF, darkmodeON } from './redux/actions';

type Props = {}

export default function App({}: Props) {
  const [showToolbar, setShowToolbar]=useState<boolean>(false);

  const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkModeReducer);

  const handleResize=()=>{
    setShowToolbar(window.innerWidth<=MOBILE_MAX_WIDTH?true:false);
  }
  // useEffect(()=>{
  //   console.log(showMenuBtn);
  // },[showMenuBtn])

  //通过监听页面大小来判断是否需要显示Nav的按钮
  useEffect(()=>{
    window.addEventListener("resize",handleResize);
    
    return()=>{
      window.removeEventListener("resize",handleResize);
    }
  },[])

  const changeDarkMode=()=>{
    if(isDarkMode){
      store.dispatch(darkmodeOFF());
    }else{
      store.dispatch(darkmodeON());
    }
    // console.log(store.getState().darkModeReducer)
  }

  useEffect(()=>{
    store.subscribe(()=>{
      const {darkModeReducer}=store.getState();

      setIsDarkMode(darkModeReducer);
    })
    
    console.log(isDarkMode);
    
  },[isDarkMode])

  // Nav test
  // const show=()=>{
  //   console.log(window.innerWidth);
    
  //   store.dispatch(showNav());
  // }
  // const hidden=()=>{
  //   store.dispatch(hideNav());
  // }

  return (
    <div className="App">
      <Nav />

      {
        showToolbar?(
          <div className='mobile-toolbar'>

            <div className='icon-container'>
              <div className='icon-block'>
                <MenuOutlined />
              </div>
            </div>

            <div className='icon-container' style={{"justifyContent": "flex-end"}}>
              <div className='icon-block' onClick={changeDarkMode}>
                {!isDarkMode?<MoonFilled />:<SunFilled />}
              </div>
            </div>

          </div>
        ):<></>
      }

      {/* Nav test */}
      {/* <Button onClick={show}>show</Button>
      <Button onClick={hidden}>hidden</Button> */}

      <Main />

    </div>
  )
}