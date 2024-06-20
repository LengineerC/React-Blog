// import { useEffect, useRef, useState } from 'react'
import Card from '../../../components/Card'
// import store from '../../../redux/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
// import { TOC_HEADING_CONFIG, MAX_TOC_HEADING } from '../../../utils/constants'
import MarkdownNavbar from 'markdown-navbar'

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
}

export default function TOC({markdown}:Props) {

  return (
    <Card className="aside-card">
      <div className='toc-header'>
        <FontAwesomeIcon icon={faList} />&nbsp;目录
        <hr/>
      </div>
      <div className='toc-content'>
        {/* <ul> */}
          <MarkdownNavbar 
          // onNavItemClick={(event,element,hash)=>handleClick(event,element,hash)} 
          source={markdown} 
          headingTopOffset={60}
          ordered={true}
          />
        {/* </ul> */}
      </div>

    </Card>
  )
}