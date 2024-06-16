import React from 'react'
import "./index.scss"

type Props = {
  scale?:boolean,
  className?:"aside-card"|"card"
  children?:React.ReactNode,
}

export default function Card({scale=false,children,className="card"}: Props) {
  return (
    <div className={`${scale?'card-main-scale':'card-main'} ${className}`}>
      {/* <div className='card-main-text-container'>
      </div> */}
      {children}
    </div>
  )
}