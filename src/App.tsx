import {lazy, useEffect, useState} from 'react'
import Nav from './components/Nav';
import Main from './components/Main';
import store from './redux/store';
import { saveCategoriesList, savePostList, saveTagsList } from './redux/actions';
import { MenuOutlined, SunFilled, MoonFilled } from '@ant-design/icons';

// import { MOBILE_MAX_WIDTH } from './utils/constants';
import { darkmodeOFF, darkmodeON } from './redux/actions';

//nav hidden test
// import { showNav, hideNav } from './redux/actions';
// import { Button } from 'antd';

import Footer from './components/Footer';
import Top from './components/Top';
import axios from 'axios';
import APlayer from './components/APlayer';
import { SHOW_APLAYER } from './utils/constants';
// import { aplayerRef } from './refs';

import './App.scss';

const MobileMenu=lazy(()=>import('./components/MobileMenu/index'))

export default function App() {
  // const [showToolbar, setShowToolbar]=useState<boolean>(false);
  const [showMenu,setShowMenu]=useState<boolean>(false);
  const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkModeReducer);

  // const handleResize=()=>{
  //   // console.log(window.innerWidth);
  //   setShowToolbar(window.innerWidth<=MOBILE_MAX_WIDTH?true:false);
  // }

  // useEffect(()=>{
  //   console.log(showMenuBtn);
  // },[showMenuBtn])

  useEffect(()=>{
    //通过监听页面大小来判断是否需要显示移动端ToolBar的按钮
    // window.addEventListener("resize",handleResize);
    // handleResize();

    //获取文章列表
    axios.get('/posts.json')
    .then(response=>{
      const {data}=response;
      // console.log(data);
      store.dispatch(savePostList(data));
    }).catch(err=>{
      console.log("文章列表获取失败",err);
    })

    // 获取Tags数据
    axios.get('/tags.json')
    .then(response=>{
      const {data}=response;
      store.dispatch(saveTagsList(data));
    })
    .catch(err=>{
      console.log("获取Tags列表失败",err);
    })

    // 获取Categories数据
    axios.get('/categories.json')
    .then(response=>{
      const {data}=response;
      store.dispatch(saveCategoriesList(data));
    })
    .catch(err=>{
      console.log("获取Categories列表失败",err);
    })

    return()=>{
      // window.removeEventListener("resize",handleResize);
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
    
    console.log(`Dark mode:${isDarkMode}`);
    
  },[isDarkMode])

  // Nav test
  // const show=()=>{
  //   // console.log(window.innerWidth);
    
  //   store.dispatch(showNav());
  // }
  // const hidden=()=>{
  //   store.dispatch(hideNav());
  // }

  // 处理移动端菜单按钮
  const handleMenuOpen=()=>{
    setShowMenu(true);
  }
  const handleMenuClose=()=>{
    setShowMenu(false);
  }

  return (
    <div className="App">
      <MobileMenu open={showMenu} handleMenuClose={handleMenuClose}/>

      {/* {
        showToolbar?(
          <div className='mobile-toolbar'>

            <div className='icon-container'>
              <div className='icon-block' onClick={handleMenuOpen}>
                <MenuOutlined />
              </div>
            </div>

            <div className='icon-container' style={{"justifyContent": "flex-end"}}>
              <div className='icon-block' onClick={changeDarkMode}>
                {!isDarkMode?<MoonFilled />:<SunFilled />}
              </div>
            </div>

          </div>
        ):<Nav />
      } */}

      <div className='mobile-toolbar'>

        <div className='icon-container'>
          <div className='icon-block' onClick={handleMenuOpen}>
            <MenuOutlined />
          </div>
        </div>

        <div className='icon-container' style={{"justifyContent": "flex-end"}}>
          <div className='icon-block' onClick={changeDarkMode}>
            {!isDarkMode?<MoonFilled />:<SunFilled />}
          </div>
        </div>

      </div>
      <Nav />
      <Main />
      <Top />

      {/* Nav test */}
      {/* <Button onClick={show}>show</Button>
      <Button onClick={hidden}>hidden</Button> */}

      
      <Footer />

      {SHOW_APLAYER && <APlayer />}
    </div>
  )
}