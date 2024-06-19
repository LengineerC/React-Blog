import { useEffect, useRef, useState } from 'react'
import Card from '../../../components/Card'
import store from '../../../redux/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { TOC_HEADING_CONFIG, MAX_TOC_HEADING } from '../../../utils/constants'

import "./index.scss"

type TOCItem={
  level: number,
  text: string,
  anchor: string,
}

export default function TOC() {
  const [TOCItems,setTOCItems]=useState<TOCItem[]>([]);
  const [activeId,setActiveId]=useState<string>();

  const generateToc=(html:string)=>{
    const parser=new DOMParser();
    const doc=parser.parseFromString(html,"text/html");
    // console.log(doc);
    const headings=doc.querySelectorAll(TOC_HEADING_CONFIG);
    const toc:TOCItem[]=[];
    headings.forEach(heading=>{
      const level=parseInt(heading.tagName[1]);
      const text=heading.textContent || '';
      const anchor=heading.id;
      toc.push({level,text,anchor});
    })
    // console.log(headings);
    return toc;
  }

  useEffect(()=>{
    //调用两次防止bug
    const {selectedPostHtmlReducer}=store.getState();
    const toc=generateToc(selectedPostHtmlReducer);
    setTOCItems(toc);
    
    const unsubscribe=store.subscribe(()=>{
      const {selectedPostHtmlReducer}=store.getState();
      if(selectedPostHtmlReducer!==''){
        const toc=generateToc(selectedPostHtmlReducer);
        setTOCItems(toc);
      }
    })

    return ()=>{
      unsubscribe();
    }
  },[])

  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          setActiveId(entry.target.id);
        }
      })
    })
    if(TOCItems.length>0){
      TOCItems.map(item=>{
        const element=document.getElementById(item.anchor);
        if(element){
          observer.observe(element);
        }
      })
    }

    return ()=>{
      TOCItems.map(item=>{
        const element=document.getElementById(item.anchor);
        if(element){
          observer.unobserve(element);
        }
      })
    }
  }, [TOCItems]);

  const scrollToHeading=(id:string)=>{
    let element=document.getElementById(id);
    element?.scrollIntoView({behavior:"smooth"});
  }

  const createTOC=()=>{
    if(TOCItems.length!==0){
      return TOCItems.map(item=>{
        return (
          <li key={item.anchor} style={{marginLeft: (item.level-MAX_TOC_HEADING)*10}}>
            <p 
            onClick={()=>scrollToHeading(item.anchor)}
            className={activeId===item.anchor?"active":""}
            >
              {item.text}
            </p>          
          </li>
        )
      })
    }
  }

  return (
    <Card className="aside-card">
      <div className='toc-header'>
        <FontAwesomeIcon icon={faList} />&nbsp;目录
        <hr/>
      </div>
      <div className='toc-content'>
        <ul>
          {createTOC()}
        </ul>
      </div>
    </Card>
  )
}