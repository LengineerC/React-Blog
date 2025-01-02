import { Suspense, useEffect, useState, useRef } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import routes from '../../routes'
import Loading from '../Loading'

export default function Main() {
  const elements=useRoutes(routes);
  const mainRef=useRef<HTMLDivElement>(null);

  return (
    <main>
      <div ref={mainRef}>

        <Suspense fallback={<Loading/>}>
          {elements}
        </Suspense>
        
      </div>
    </main>
  )
}