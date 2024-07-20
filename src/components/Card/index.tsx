// import {useState, useEffect} from 'react'
// import store from '../../redux/store'
import "./index.scss"

type Props = {
  scale?:boolean,
  className?:"aside-card"|"card"
  children?:React.ReactNode,
  bgImage?:string,
  opacity?:number,
  background?:string,
  darkMode:boolean,
}

export default function Card({scale=false,children,className="card",bgImage,opacity=1,background,darkMode}: Props) {
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);

  // useEffect(()=>{
  //   const unsubscribe=store.subscribe(()=>{
  //     const {darkMode}=store.getState();
  //     setIsDarkMode(darkMode);
  //   })

  //   return ()=>{
  //     unsubscribe();
  //   }
  // },[])

  return (
    <div 
    className={`${scale?'card-main-scale':'card-main'} ${className} ${darkMode?'card-main-dark':""}`}
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