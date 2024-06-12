import React from 'react'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Home=lazy(()=>import("../../pages/Home/index"))

type Props = {}

export default function Main({}: Props) {
  return (
    <main>
      <div>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<Home />} />

            //找不到页面自动返回Home，加404改路由
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>

        </Suspense>
      </div>
    </main>
  )
}