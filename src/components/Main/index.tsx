import { Suspense, useEffect, useState, useRef } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import routes from '../../routes'
import Loading from '../Loading'

export default function Main() {
  const elements=useRoutes(routes);
  const mainRef=useRef<HTMLDivElement>(null);

  // useEffect(()=>{
  //   let aplayer:any=null;

  //   const findAPlayer=()=>{
  //     console.log("find");
  //     let metingJS:any=mainRef.current?.querySelector('meting-js');
  //     aplayer=metingJS?.aplayer;
  //     if(aplayer){
  //       // console.log(aplayer.container.classList);
  //       clearInterval(findAPlayerTimer);
  //     }
  //   }

  //   const handleClassListUndefined=()=>{
  //     if(aplayer){
  //       console.log(aplayer.container.classList);
  //     }
  //     if(aplayer && typeof aplayer.container.classList==="undefined"){
  //       aplayer.container.classList=[];
  //     }
  //   }

  //   const findAPlayerTimer=setInterval(findAPlayer,1000);
  //   const aplayerClassListTimer=setInterval(handleClassListUndefined,1000);
    
  //   return ()=>{
  //     if(findAPlayerTimer){
  //       clearInterval(findAPlayerTimer);
  //     }
  //     if(aplayerClassListTimer){
  //       clearInterval(aplayerClassListTimer);
  //     }
  //   }

  // },[])

  return (
    <main>
      <div ref={mainRef}>
        {/* <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<Home />} />

            //找不到页面自动返回Home，加404改路由
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>

        </Suspense> */}

        <Suspense fallback={<Loading/>}>
          {elements}
        </Suspense>
        
      </div>
    </main>
  )
}