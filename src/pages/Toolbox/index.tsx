import { Suspense, useEffect, useState } from 'react'
import PageTitle from '@/components/PageTitle';
import { useAppSelector } from '@/redux/hooks';
import Card from '@/components/Card';
import { Outlet, useLocation } from 'react-router-dom';

import "./index.scss";

export default function Toolbox() {
  const darkMode=useAppSelector(state=>state.darkMode);
  const [subtitle,setSubtitle]=useState<string>("");
  
  const location=useLocation();

  useEffect(()=>{
    // console.log(location.pathname);
    const paths=location.pathname.split('/');
    setSubtitle(paths[2]);
    
  },[location]);

  return (
    <div className='page-main'>
      <div className='page-main-title'>
        <PageTitle title={"Toolbox ~ "+subtitle}/>
      </div>

      <div className='page-main-content'>
        <Card darkMode={darkMode}>
          {/* <Suspense> */}
            <Outlet />
          {/* </Suspense> */}
        </Card>
      </div>
    </div>
  )
}
