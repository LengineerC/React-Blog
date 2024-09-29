import { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
// import store from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse,
  faBook,
  faFileZipper,
  faLink,
  faAddressCard,
  faMusic, 
  faAngleDown, 
  faAngleUp, 
  IconDefinition, 
  faXmark, 
  faTag,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { setDarkModeOFF, setDarkModeON } from '../../redux/actions';
import { MoonFilled, SunFilled } from '@ant-design/icons';
import { MenuConfig } from '../../utils/types';

import "./index.scss";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { Dispatch } from 'redux';
// import { connect } from 'react-redux';

//Nav内容块列宽度显示
const show_border={
  // border:"2px solid black",
  border:"none",
};

const navCenterColConfig:MenuConfig[]=[
  {
    name:"文章",
    path:"posts",
    key:"posts",
    clickable:false,
    options:{
      subMenuEnable:true,
      subItems:[
        <NavLink to="/tags">
          <FontAwesomeIcon style={{marginRight:"5px"}} icon={faTag}/>
          标签
        </NavLink>,
        <NavLink to="/categories">
          <FontAwesomeIcon style={{marginRight:"5px"}} icon={faBookmark}/>
          分类
        </NavLink>,
      ],
    }
  },
  {
    name:"归档",
    path:"archives",
    key:"archives",
    clickable:true,
    options:{
      subMenuEnable:false,
      subItems:[
      ],
    }
  },
  {
    name:"媒体",
    path:"media",
    key:"media",
    clickable:true,
    options:{
      subMenuEnable:false,
      subItems:[
        <p>music</p>
      ],
    }
  },
  {
    name:"友链",
    path:"friends",
    key:"friends",
    clickable:true,
    options:{
      subMenuEnable:false,
      subItems:[
      ],
    }
  },
  {
    name:"关于",
    path:"about",
    key:"about",
    clickable:true,
    options:{
      subMenuEnable:false,
      subItems:[
      ],
    }
  },
]

export default function Nav() {
  const navState=useAppSelector(state=>state.navState);
  const [visible,setVisible]=useState<boolean>(navState);
  // const [lastScrollTop,setLastScrollTop]=useState<number>(0);
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(false);
  const [navTransparent,setNavTransparent]=useState<boolean>(true);
  const [showSubMenu,setShowSubMenu]=useState<string|null>(null);

  const darkMode:boolean=useAppSelector(state=>state.darkMode);

  const dispatch=useAppDispatch();

  // const handleScroll=()=>{
  //   let currentScrollTop=window.scrollY || document.documentElement.scrollTop;
  //   let scrollStep = currentScrollTop - lastScrollTop;
  //   setLastScrollTop(currentScrollTop);

  //   if(scrollStep<0){
  //       setVisible(false);
  //     }else{
  //       setVisible(true);
  //     }
  //   // setLastScrollTop(currentScrollTop <= lastScrollTop ? lastScrollTop : currentScrollTop);
  // }

  //原处理方法state异步更新导致bug
  let lastScrollTop=0;
  const handleScroll = () => {
    // let clientHeight = document.documentElement.clientHeight;
    let scrollTop = document.documentElement.scrollTop;
    // let scrollHeight = document.documentElement.scrollHeight;
    // console.log("scrollTop", scrollTop, 'lastScrollY', lastScrollTop, 'clientHeight', clientHeight, 'scrollHeight', scrollHeight);
    if (scrollTop <= lastScrollTop) {
      setVisible(true)
    } else {
      setVisible(false)
    }
    lastScrollTop = document.documentElement.scrollTop
    // 判断是否滚动到底部
    // if (scrollTop + clientHeight === scrollHeight) {
    //   console.log("滚动到底部");
    // }
  }

  const iconChooser=(name:string):IconDefinition=>{
    switch(name){
      case "posts":
        return faBook;
      case "archives":
        return faFileZipper;
      case "media":
        return faMusic;
      case "friends":
        return faLink;
      case "about":
        return faAddressCard;
      default:
        return faXmark;
    }
  }

  const createCenterColItems=()=>{
    return navCenterColConfig.map(item=>{
      return(
        <div
        className='nav-content-container' 
        style={show_border}
        onMouseEnter={()=>handleMouseEnter(item.path)}
        onMouseLeave={handleMouseLeave}
        key={item.key}
        // push={1}
        >
          {item.clickable? 
          <NavLink to={item.path}>
            <div className={darkMode?"click-container-dark":'click-container'}>
              <FontAwesomeIcon icon={iconChooser(item.key)} />
              <div className='nav-click-text-container'>
                {item.name}
                {item.options.subMenuEnable &&
                  <span className='nav-click-text-icon'>
                    {
                      showSubMenu===item.key?
                      <FontAwesomeIcon icon={faAngleUp} />
                      :<FontAwesomeIcon icon={faAngleDown} />
                    }
                  </span>
                }
              </div>
            </div>
          </NavLink>:
            <div className={darkMode?"click-container-dark":'click-container'}>
              <FontAwesomeIcon icon={iconChooser(item.key)} />
              <div className='nav-click-text-container'>
                {item.name}
                {item.options.subMenuEnable &&
                  <span className='nav-click-text-icon'>
                    {
                      showSubMenu===item.key?
                      <FontAwesomeIcon icon={faAngleUp} />
                      :<FontAwesomeIcon icon={faAngleDown} />
                    }
                  </span>
                }
              </div>
            </div>
          }

          {item.options.subMenuEnable&&
            <>
              {
                // showSubMenu===item.key && 
                <div className={`${darkMode?'sub-menu-dark':'sub-menu'} ${showSubMenu!==item.key?"fade-out":""}`}>
                  {
                    item.options.subItems.map((subItem,index)=>{
                      return(
                        <div 
                        className={darkMode?'sub-menu-item-dark':'sub-menu-item'} 
                        key={index}
                        >
                          {subItem}
                        </div>
                      )
                    })
                  }
                </div>
              }
            </>
          }
        </div>
      )
    })

  }

  const checkScrollTop=()=>{
    if(window.scrollY<10){
      setNavTransparent(true);
    }else{
      setNavTransparent(false);
    }
  }

  const handleMouseEnter=(menu:string)=>{
    setShowSubMenu(menu);
  }

  const handleMouseLeave=()=>{
    setShowSubMenu(null);
  }

  const changeDarkMode=()=>{
    // const {dispatch}=store;
    // const {darkMode}=store.getState();
    if(darkMode){
      dispatch(setDarkModeOFF());
      localStorage.setItem('darkMode','false');
    }else{
      dispatch(setDarkModeON());
      localStorage.setItem('darkMode','true');
    }
  }

  //订阅监听夜间模式切换和滚动事件修改样式
  useEffect(()=>{
    // store.subscribe(()=>{
    //   const {darkMode}=store.getState();
    //   setIsDarkMode(darkMode);
    // });

    window.addEventListener("scroll",handleScroll);
    window.addEventListener("scroll",checkScrollTop);

    return ()=>{
      window.removeEventListener("scroll",handleScroll);
      window.removeEventListener("scroll",checkScrollTop);
    }
  },[])

  //nav显示状态和redux绑定
  useEffect(()=>{
    // console.log(store.getState());
    // store.subscribe(()=>{
    //   const {navState}=store.getState();
    //   // console.log(store.getState());
      
    //   if(navState!==visible){
    //     setVisible(navState);
    //   }
    // });
    setVisible(navState);
    
  },[navState])

  return (
    <nav className={`
    ${!visible?'hidden-nav':''} 
    ${darkMode?'nav-dark':"nav"}
    ${navTransparent?"nav-transparent":''}
    `}>
      <Row>
        <Col 
        span="8" 
        className='nav-content-container' 
        style={show_border}
        >
          <NavLink to="/">
            <div className={darkMode?'click-container-dark':'click-container'} style={{width:"160px"}}>
              <FontAwesomeIcon icon={faHouse} />
            </div>
          </NavLink>
        </Col>

        {/*用于间隔*/}
        {/* <Col 
        span="1"
        style={show_border}
        >
        </Col> */}

        <Col className='nav-center-col' flex={1} span={8}>
          {createCenterColItems()}

        {
        //#region 非动态渲染
        /*
        <div 
        className='nav-content-container' 
        onMouseEnter={()=>handleMouseEnter("articles")}
        onMouseLeave={handleMouseLeave}
        style={show_border}
        >
          <NavLink to="articles">
            <div 
            className='click-container'
            >
              <FontAwesomeIcon icon={faBook} />
              <div className='nav-click-text-container'>
                文章
                {subMenuConfig.articles.enable&&
                  <span className='nav-click-text-icon'>
                    {
                      showSubMenu?
                      <FontAwesomeIcon icon={faAngleUp} />
                      :<FontAwesomeIcon icon={faAngleDown} />
                    }
                  </span>
                }
              </div>
            </div>
          </NavLink>

          {subMenuConfig.articles.enable&&
            <>
              {
                showSubMenu==="articles" && (
                  <div className='sub-menu'>
                    {
                      subMenuConfig.articles.subItems.map((item,index)=>{
                        return(
                          <div className='sub-menu-item' key={index}>
                            {item}
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
            </>
          }
        </div>

        <div 
        className='nav-content-container' 
        style={show_border}
        onMouseEnter={()=>handleMouseEnter("archives")}
        onMouseLeave={handleMouseLeave}
        // push={1}
        >
          <NavLink to="archives">
            <div className='click-container'>
              <FontAwesomeIcon icon={faFileZipper} />
              <div className='nav-click-text-container'>
                归档
                {subMenuConfig.archives.enable&&
                  <span className='nav-click-text-icon'>
                    {
                      showSubMenu?
                      <FontAwesomeIcon icon={faAngleUp} />
                      :<FontAwesomeIcon icon={faAngleDown} />
                    }
                  </span>
                }
              </div>
            </div>
          </NavLink>
          
          {subMenuConfig.archives.enable&&
            <>
              {
                showSubMenu==="articles" && (
                  <div className='sub-menu'>
                    {
                      subMenuConfig.archives.subItems.map((item,index)=>{
                        return(
                          <div className='sub-menu-item' key={index}>
                            {item}
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
            </>
          }
        </div>

        <div 
        className='nav-content-container' 
        style={show_border}
        onMouseEnter={()=>handleMouseEnter("media")}
        onMouseLeave={handleMouseLeave}
        // push={1}
        >
          <NavLink to="media">
            <div className='click-container'>
              <FontAwesomeIcon icon={faMusic} />
              <div className='nav-click-text-container'>
                媒体
                {subMenuConfig.media.enable&&
                  <span className='nav-click-text-icon'>
                    {
                      showSubMenu?
                      <FontAwesomeIcon icon={faAngleUp} />
                      :<FontAwesomeIcon icon={faAngleDown} />
                    }
                  </span>
                }
              </div>
            </div>
          </NavLink>

          {subMenuConfig.media.enable&&
            <>
              {
                showSubMenu==="articles" && (
                  <div className='sub-menu'>
                    {
                      subMenuConfig.media.subItems.map((item,index)=>{
                        return(
                          <div className='sub-menu-item' key={index}>
                            {item}
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
            </>
          }
        </div>

        <div
        className='nav-content-container' 
        style={show_border}
        onMouseEnter={()=>handleMouseEnter("friends")}
        onMouseLeave={handleMouseLeave}
        // push={1}
        >
          <NavLink to="friends">
            <div className='click-container'>
              <FontAwesomeIcon icon={faLink} />
              <div className='nav-click-text-container'>
                友链
                {subMenuConfig.friends.enable&&
                  <span className='nav-click-text-icon'>
                    {
                      showSubMenu?
                      <FontAwesomeIcon icon={faAngleUp} />
                      :<FontAwesomeIcon icon={faAngleDown} />
                    }
                  </span>
                }
              </div>
            </div>
          </NavLink>

          {subMenuConfig.friends.enable&&
            <>
              {
                showSubMenu==="articles" && (
                  <div className='sub-menu'>
                    {
                      subMenuConfig.friends.subItems.map((item,index)=>{
                        return(
                          <div className='sub-menu-item' key={index}>
                            {item}
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
            </>
          }
        </div>

        <div 
        className='nav-content-container' 
        style={show_border}
        onMouseEnter={()=>handleMouseEnter("about")}
        onMouseLeave={handleMouseLeave}
        // push={1}
        >
          <NavLink to="about">
            <div className='click-container'>
              <FontAwesomeIcon icon={faAddressCard} />
              <div className='nav-click-text-container'>
                关于
              </div>
            </div>
          </NavLink>
        </div> 
        */
        //#endregion
        }
        </Col>

        <Col 
        span="8"
        className='nav-content-container'
        // push={1}
        style={show_border}
        >
          <div className='nav-tool-click-container' onClick={changeDarkMode}>
            {!darkMode?<MoonFilled />:<SunFilled />}
          </div>
        </Col>

      </Row>
    </nav>
  )
}

// const mapStateToProps=(state:any)=>({
//   darkMode:state.darkMode,
//   navState:state.navState,
// });

// const mapDispatchToProps=(dispatch:Dispatch)=>({
//   setDarkModeOFF:dispatch(setDarkModeOFF()),
//   setDarkModeON:dispatch(setDarkModeON()),
// });

// export default connect(mapStateToProps,mapDispatchToProps)(Nav);