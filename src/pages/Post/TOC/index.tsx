// import { useEffect, useRef, useState } from 'react'
import Card from '../../../components/Card'
// import store from '../../../redux/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
// import { TOC_HEADING_CONFIG, MAX_TOC_HEADING } from '../../../utils/constants'
import MarkdownNavbar from 'markdown-navbar'
import { ConfigProvider, Drawer } from 'antd'
import { useEffect, useState } from 'react'
import { MOBILE_MAX_WIDTH } from '../../../utils/constants'
import store from '../../../redux/store'
import { useAppSelector } from '../../../redux/hooks'

import "./index.scss"

//#region 手动实现有bug
// type Props={
//   markdown:'';
// }

// type TOCItem={
//   level: number,
//   text: string,
//   anchor: string,
// }

// export default function TOC() {
//   const [TOCItems,setTOCItems]=useState<TOCItem[]>([]);
//   const [activeId,setActiveId]=useState<string>();
//   // const {activeId}=useHeadingObserver();

//   const generateToc=(html:string)=>{
//     const parser=new DOMParser();
//     const doc=parser.parseFromString(html,"text/html");
//     // console.log(doc);
//     const headings=doc.querySelectorAll(TOC_HEADING_CONFIG);
//     const toc:TOCItem[]=[];
//     headings.forEach(heading=>{
//       const level=parseInt(heading.tagName[1]);
//       const text=heading.textContent || '';
//       const anchor=heading.id;
//       toc.push({level,text,anchor});
//     })
//     // console.log(headings);
//     return toc;
//   }

//   useEffect(()=>{
//     //调用两次防止bug
//     const {selectedPostHtmlReducer}=store.getState();
//     const toc=generateToc(selectedPostHtmlReducer);
//     setTOCItems(toc);
    
//     const unsubscribe=store.subscribe(()=>{
//       const {selectedPostHtmlReducer}=store.getState();
//       if(selectedPostHtmlReducer!==''){
//         const toc=generateToc(selectedPostHtmlReducer);
//         setTOCItems(toc);
//       }
//     })

//     return ()=>{
//       unsubscribe();
//     }
//   },[])

//   useEffect(() => {
//     const observer = new IntersectionObserver(entries => {
//       const visibleEntries = entries.filter(entry => entry.isIntersecting);
//       if (visibleEntries.length > 0) {
//         // Sort by intersection ratio
//         visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
//         console.log(visibleEntries);
        
//         setActiveId(visibleEntries[0].target.id);
//       }
//     }, { 
//       threshold: [0.1,0.5,1.0],
//      });

//     if (TOCItems.length > 0) {
//       TOCItems.forEach(item => {
//         const element = document.getElementById(item.anchor);
//         if (element) {
//           observer.observe(element);
//         }
//       });
//     }

//     return () => {
//       TOCItems.forEach(item => {
//         const element = document.getElementById(item.anchor);
//         if (element) {
//           observer.unobserve(element);
//         }
//       });
//     };
//   }, [TOCItems]);

//   const scrollToHeading=(id:string)=>{
//     let element=document.getElementById(id);
//     element?.scrollIntoView({behavior:"smooth"});
//     setActiveId(id);
//   }

//   const createTOC=()=>{
//     if(TOCItems.length!==0){
//       return TOCItems.map(item=>{
//         return (
//           <li key={item.anchor} style={{marginLeft: (item.level-MAX_TOC_HEADING)*10}}>
//             <p 
//             onClick={()=>scrollToHeading(item.anchor)}
//             className={activeId===item.anchor?"active":""}
//             >
//               {item.text}
//             </p>          
//           </li>
//         )
//       })
//     }
//   }

//   return (
//     <Card className="aside-card">
//       <div className='toc-header'>
//         <FontAwesomeIcon icon={faList} />&nbsp;目录
//         <hr/>
//       </div>
//       <div className='toc-content'>
//         <ul>
//           {createTOC()}
//         </ul>
//       </div>


//     </Card>
//   )
// }
//#endregion

type Props={
  markdown:string;
  showDrawer:boolean,
  callbackOnClose:Function,
}

export default function TOC({markdown, showDrawer,callbackOnClose}:Props) {
  const [open,setOpen]=useState<boolean>(showDrawer);
  const [drawerVisible,setDrawerVisible]=useState<boolean>(window.innerWidth<=MOBILE_MAX_WIDTH);
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode=useAppSelector(state=>state.darkMode);

  useEffect(()=>{
    setOpen(showDrawer);
  },[showDrawer])
  
  const onClose=()=>{
    setOpen(false);
    callbackOnClose();
  }

  useEffect(()=>{
    // const unsubscribe=store.subscribe(()=>{
    //   const {darkMode}=store.getState();
    //   setIsDarkMode(darkMode);
    // })

    const handleResize=()=>{
      setDrawerVisible(window.innerWidth<=MOBILE_MAX_WIDTH);
    }

    window.addEventListener("resize",handleResize);

    return ()=>{
      // unsubscribe();
      window.removeEventListener("resize",handleResize);
    }
  },[])

  useEffect(()=>{

  },[darkMode])

  const getColorBgElevated=():string=>{
    return darkMode?"#1c1c2c99":"#ffffffcc";
  }

  return (
    <>
      {
        !drawerVisible ?(
        <Card className="aside-card" darkMode={darkMode}>
          <div className={darkMode?"toc-header-dark":'toc-header'}>
            <FontAwesomeIcon icon={faList} />&nbsp;目录
            <hr/>
          </div>
          <div className={darkMode?"toc-content-dark":'toc-content'}>
              <MarkdownNavbar 
              // onNavItemClick={(event,element,hash)=>handleClick(event,element,hash)} 
              source={markdown} 
              headingTopOffset={60}
              ordered={true}
              />
          </div>

        </Card>):(
          <div className='toc-drawer-block'>
          <ConfigProvider
          theme={{
            token:{
              padding:0,
              paddingLG:0,
              paddingXS:0,
              colorBgElevated:getColorBgElevated()
            }
          }}
          >
            <Drawer
            className={darkMode?"toc-drawer-dark":'toc-drawer'}
            placement="right"
            open={open}
            onClose={onClose}
            width={250}
            closeIcon={null}
            // destroyOnClose  //不加此项测试运行手机端不显示目录时滑动过快报错，正式运行不影响，但性能会受损 
            >
              <div className={darkMode?"toc-header-dark":'toc-header'}>
                <FontAwesomeIcon icon={faList} />&nbsp;目录
                <hr/>
              </div>
              <div className='toc-content'>
                <MarkdownNavbar 
                // onNavItemClick={(event,element,hash)=>handleClick(event,element,hash)} 
                source={markdown} 
                headingTopOffset={60}
                ordered={true}
                />
              </div>

            </Drawer>
          </ConfigProvider>
        </div>)
      }
    </>
  )
}