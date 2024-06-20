import { useState, useEffect, useRef } from "react";
import { TOC_HEADING_CONFIG } from "../utils/constants";

export function useHeadingObserver(){
    const observer=useRef();
    const [activeId, setActiveId]=useState('');

    useEffect(()=>{
        const handleObserver=(entries)=>{
            entries.forEach(entry=>{
                if(entry?.isIntersecting){
                    setActiveId(entry.target.id);
                }
            })
        }
        
        observer.current=new IntersectionObserver(handleObserver,{
            rootMargin:"-20% 0% -35% 0px",
        });

        const elements=document.querySelectorAll(TOC_HEADING_CONFIG);
        elements.forEach(element=>observer.current?.observe(element));

        return ()=>observer.current?.disconnect();
    },[])

    return {activeId};
}