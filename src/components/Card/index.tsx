import React from 'react'
import "./index.scss"

type Props = {
  children:React.ReactNode,
}

export default function Card({children}: Props) {
  return (
    <div className='card-main'>
      <div className='card-main-text-container'>
        {children}
      </div>
    </div>
  )
}