import {lazy, useEffect, useState} from 'react'
import Nav from './components/Nav';
import Main from './components/Main';
import store from "./redux/store";
// import { saveCategoriesList, savePostList, saveTagsList } from './redux/actions';
import { MenuOutlined, SunFilled, MoonFilled } from '@ant-design/icons';

// import { MOBILE_MAX_WIDTH } from './utils/constants';
import { setDarkModeOFF, setDarkModeON, savePostList, saveTagsList, saveCategoriesList } from './redux/actions';

import Footer from './components/Footer';
import Top from './components/Top';
import axios from 'axios';
import APlayer from './components/APlayer';
import { SHOW_APLAYER } from './utils/constants';
// import { aplayerRef } from './refs';
import bgImgLight from "./assets/image/bg1.webp";
import bgImgDark from "./assets/image/bg0.webp";
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { Dispatch } from 'redux';

import './App.scss';

const MobileMenu=lazy(()=>import('./components/MobileMenu/index'))

const App:React.FC<any>=()=>{
  // const [showToolbar, setShowToolbar]=useState<boolean>(false);
  const [showMenu,setShowMenu]=useState<boolean>(false);
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(darkMode);
  const darkMode:boolean=useAppSelector(state=>state.darkMode);
  const dispatch:Dispatch=useAppDispatch();

  // const handleResize=()=>{
  //   // console.log(window.innerWidth);
  //   setShowToolbar(window.innerWidth<=MOBILE_MAX_WIDTH?true:false);
  // }

  // useEffect(()=>{
  //   console.log(showMenuBtn);
  // },[showMenuBtn])

  const getBodyStyleInnerHtml = (isDarkMode:boolean):string => {
    return isDarkMode ? (`
      body::-webkit-scrollbar {
        width: 12px;
      }
      body::-webkit-scrollbar-track {
        background: linear-gradient(#9191a7, #8888a7);
        border-radius: 100px;
      }
      body::-webkit-scrollbar-thumb {
        background: linear-gradient(#686894, #46466c);
        border-radius: 50px;
      }
      body::-webkit-scrollbar-thumb:active {
        background: linear-gradient(#7c7ca5, #61618f);
      }
    `) : (`
      body::-webkit-scrollbar {
        width: 12px;
      }
      body::-webkit-scrollbar-track {
        background: linear-gradient(#b7f9ff, #a3c8db);
        border-radius: 100px;
      }
      body::-webkit-scrollbar-thumb {
        background: linear-gradient(rgb(103, 171, 255), rgb(62, 125, 202));
        border-radius: 50px;
      }
      body::-webkit-scrollbar-thumb:active {
        background: linear-gradient(rgb(123, 182, 255), rgb(82, 145, 223));
      }
    `);
  };

  useEffect(()=>{
    const bodyStyle=document.querySelector('#bodyStyle') as HTMLElement;
    // const {darkMode}=store.getState();
    bodyStyle.innerHTML=getBodyStyleInnerHtml(darkMode);
    //通过监听页面大小来判断是否需要显示移动端ToolBar的按钮
    // window.addEventListener("resize",handleResize);
    // handleResize();

    // const {dispatch}=store;
    //获取文章列表
    axios.get('/json/posts.json')
    .then(response=>{
      const {data}=response;
      // console.log(data);
      dispatch(savePostList(data));
    }).catch(err=>{
      console.log("文章列表获取失败",err);
    })

    // 获取Tags数据
    axios.get('/json/tags.json')
    .then(response=>{
      const {data}=response;
      dispatch(saveTagsList(data));
    })
    .catch(err=>{
      console.log("获取Tags列表失败",err);
    })

    // 获取Categories数据
    axios.get('/json/categories.json')
    .then(response=>{
      const {data}=response;
      dispatch(saveCategoriesList(data));
    })
    .catch(err=>{
      console.log("获取Categories列表失败",err);
    })

    // const unsubscribe=store.subscribe(()=>{
    //   const {darkMode}=store.getState();
    //   if(isDarkMode!==darkMode){
    //     setIsDarkMode(darkMode);
    //   }
    // })
    let localStorageDarkMode=localStorage.getItem('darkMode') || 'false';
    
    if(localStorageDarkMode==='false'){
      dispatch(setDarkModeOFF());
    }else{
      dispatch(setDarkModeON());
    }

    return()=>{
      // window.removeEventListener("resize",handleResize);
      // unsubscribe();
    }
  },[])

  // useEffect(()=>{
  //   // const bodyDom:HTMLElement|null=document.querySelector('body');
  //   // let imgUrl=isDarkMode?"./image/bg0.webp":"./image/bg1.webp";
  //   // if(bodyDom){
  //   //   bodyDom.style.backgroundImage=`url(${imgUrl})`;
  //   // }

  //   const bodyStyle=document.querySelector('#bodyStyle') as HTMLElement;
  //   // const unsubscribe=store.subscribe(()=>{
  //   //   const {darkMode}=store.getState();
  //   //   if(isDarkMode!==darkMode){
  //   //     setIsDarkMode(darkMode);
  //   //   }
  //   // })
  //   bodyStyle.innerHTML=getBodyStyleInnerHtml(d);

  //   // return ()=>{
  //   //   unsubscribe();
  //   // }
    
  // },[isDarkMode])

  useEffect(()=>{
    // setIsDarkMode(darkMode);
    const bodyStyle=document.querySelector('#bodyStyle') as HTMLElement;
    bodyStyle.innerHTML=getBodyStyleInnerHtml(darkMode);

  },[darkMode])

  const changeDarkMode=()=>{
    // const {dispatch}=store;
    if(darkMode){
      // store.dispatch(darkmodeOFF());
      dispatch(setDarkModeOFF());
      localStorage.setItem('darkMode','false');
    }else{
      // store.dispatch(darkmodeON());
      dispatch(setDarkModeON());
      localStorage.setItem('darkMode','true');
    }
    // console.log(store.getState().darkMode)
  }

  // 处理移动端菜单按钮
  const handleMenuOpen=()=>{
    setShowMenu(true);
  }
  const handleMenuClose=()=>{
    setShowMenu(false);
  }

  return (
    <div 
    className="App"
    style={{
      // backgroundImage:`url(${isDarkMode?bgImgDark:bgImgLight})`,
      '--bgImg':`url(${darkMode?bgImgDark:bgImgLight})`
    } as React.CSSProperties}
    >
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
            {!darkMode?<MoonFilled />:<SunFilled />}
          </div>
        </div>

      </div>
      <Nav />
      <Main />
      <Top darkMode={darkMode}/>
      <Footer />
      
      {
        SHOW_APLAYER && 
        <div className={darkMode?"aplayer-container-dark":"aplayer-container"}>
          <APlayer />
        </div>
      }

    </div>
  )
}

const mapStateToProps = (state:any) => ({
  darkMode: state.darkMode,
});

const mapDispatchToProps = {
  savePostList,
  saveTagsList,
  saveCategoriesList,
  setDarkModeOFF,
  setDarkModeON,
};

// export default connect(mapStateToProps,mapDispatchToProps)(App);
export default App;