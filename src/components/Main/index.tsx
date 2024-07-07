import { Suspense, useEffect, useState } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import routes from '../../routes'
import Loading from '../Loading'

// import Media from '../../pages/Media'

// const Home=lazy(()=>import("../../pages/Home/index"))

export default function Main() {
  const elements=useRoutes(routes)

  //#region 处理Media
  // const location=useLocation();
  // const [showMedia,setShowMedia]=useState<boolean>(false);

  // useEffect(()=>{
  //   console.log(location.pathname);
    
  //   setShowMedia(location.pathname==='/media');
  // },[location])
  //#endregion

  return (
    <main>
      <div>
        {/* <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<Home />} />

            //找不到页面自动返回Home，加404改路由
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>

        </Suspense> */}

        <Suspense fallback={<Loading/>}>
          {elements}
          {/* {showMedia && <Media />} */}
        </Suspense>
        
      </div>
    </main>
  )
}