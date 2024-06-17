import React from 'react'
import "./index.scss"

type Props = {
  scale?:boolean,
  className?:"aside-card"|"card"
  children?:React.ReactNode,
  bgImage?:string,
  opacity?:number,
  background?:string,
}

export default function Card({scale=false,children,className="card",bgImage,opacity=1,background}: Props) {

  return (
    <div 
    className={`${scale?'card-main-scale':'card-main'} ${className}`}
    style={{
      backgroundImage:`url(${bgImage})`,
      opacity:`${opacity}`,
      background:`${background}`
    }}
    >
      {/* <div className='card-main-text-container'>
      </div> */}
      {children}
    </div>
  )
}