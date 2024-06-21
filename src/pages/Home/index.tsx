import SiteTitle from '../../components/SiteTitle'
import HomePosts from './HomePosts'

import "./index.scss"
import Aside from './Aside'

export default function Home() {

  return (
    <>
      <SiteTitle />
      {/* <Card /> */}
      <div className='home-body'>
        <div className='home-body-left-col'>
          <HomePosts />
        </div>

        <div className='home-body-right-col'>
          <Aside />
        </div>
      </div>
    </>
  )
}