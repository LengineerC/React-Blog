import { useEffect, useRef, useState } from 'react';
import Card from '../../components/Card';
import PageTitle from '../../components/PageTitle';
import { BILIBILI_VIDEO_URL, IRC_TYPE, MUSIC_URL } from '../../utils/constants';
// import { useLocation } from 'react-router-dom';
// import store from '../../redux/store';

import './index.scss';
import { useAppSelector } from '../../redux/hooks';

export default function Media() {
  const aplayerRef=useRef(null);
  // const aplayerInstanceRef = useRef(null)
  const effectRan=useRef<boolean>(false);
  // const [isDarkMode,setIsDarkMode]=useState<boolean>(store.getState().darkMode);
  const darkMode=useAppSelector(state=>state.darkMode);

  // const location=useLocation();

  useEffect(() => {
    // const unsubscribe=store.subscribe(()=>{
    //   const {darkMode}=store.getState();
    //   setIsDarkMode(darkMode);
    // })
    if(effectRan.current) return;

    let aplayerInstance:any=null;
    const checkAPlayerInstance = () => {
      if (aplayerRef.current && (aplayerRef as any).current.aplayer) {
        aplayerInstance = (aplayerRef as any).current.aplayer;
        
      } else {
        setTimeout(checkAPlayerInstance, 100);
      }
    };

    checkAPlayerInstance();
    effectRan.current=true;

    return () => {
      // unsubscribe();
      if(aplayerInstance){
        (aplayerInstance as any).destroy();
      }
      effectRan.current=false;
    };
  }, []);

  return (
    <div className="page-main">
      <div className="page-main-title">
        <PageTitle title="Media" />
      </div>
      <div className="page-main-content">
        <Card darkMode={darkMode}>
          <div className="media-card-main">
            <div className={darkMode?'media-title-dark':'media-title'}>
              🎶穢れなき音楽室
            </div>
            <div className={darkMode?'media-card-main-player-dark':"media-card-main-player"}>
              <meting-js 
                ref={aplayerRef}
                auto={MUSIC_URL}
                theme="#67abff"
                volume={0.5}
                IrcType={IRC_TYPE}
              />
            </div>

            <div className={darkMode?'media-title-dark':'media-title'}>
              📺远古视频
            </div>
            <div className='media-card-main-video'>
              <iframe 
                src={BILIBILI_VIDEO_URL}
                scrolling="no" 
                frameBorder="no" 
                allowFullScreen={true}
                >
              </iframe>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
