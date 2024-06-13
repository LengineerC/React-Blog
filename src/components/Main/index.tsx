import React from 'react'
import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '../../routes'
import Loading from '../Loading'

// const Home=lazy(()=>import("../../pages/Home/index"))

export default function Main() {

  const elements=useRoutes(routes)

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
        </Suspense>
        
      </div>
    </main>
  )
}