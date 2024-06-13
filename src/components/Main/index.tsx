import React from 'react'
import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '../../routes'

// const Home=lazy(()=>import("../../pages/Home/index"))

type Props = {}

export default function Main({}: Props) {

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

        <Suspense fallback={<></>}>
          {elements}
        </Suspense>
      </div>
    </main>
  )
}