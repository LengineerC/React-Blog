import {useEffect, useState} from 'react'

import "./index.scss"
import { NavLink } from 'react-router-dom'

type Props = {
  tag: string,
  reload?:boolean,
}

export default function Tag({ tag,reload=false }: Props) {
  const [bgColor,setBgColor]=useState<number>(0)

  useEffect(()=>{
    let color=Math.floor(Math.random()*3);
    // console.log(color);
    setBgColor(color)
    
  },[])

  const colorChooser=(color:number):string=>{
    let style="tag-bg-color-";
    return style+color;
  }

  const reloadPage=()=>{
    if(reload){
      window.location.reload();
    }

  }

  return (
    <div className="tag-main">
      <NavLink onClick={reloadPage} to={`/tags/${tag}`} style={{ textDecoration: "none" }}>
        <div className={colorChooser(bgColor)}>
          {tag}
        </div>
      </NavLink>
    </div>
  )
}