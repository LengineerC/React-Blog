import React from 'react'
import "./index.scss"

type Props = {
  scale?:boolean,
  children?:React.ReactNode,
}

export default function Card({scale=false,children}: Props) {
  return (
    <div className={scale?'card-main-scale':'card-main'}>
      {/* <div className='card-main-text-container'>
      </div> */}
      {children}
    </div>
  )
}