// import { useEffect, useRef } from "react";
// import Card from "../../components/Card"
// import PageTitle from "../../components/PageTitle"
// import { aplayerRef } from "../../refs";

// import "./index.scss"

// export default function Media() {
//   // let aplayer:any='';

//   useEffect(()=>{
//     // aplayer=aplayerRef.current;
//   },)

//   return (
//     <div className="page-main">
      
//       <div className="page-main-title">
//         <PageTitle title="Media" />
//       </div>

//       <div className="page-main-content">
//         <Card>
//           <div className="media-card-main">
//             <div className="media-card-main-player">
//               {/* {aplayer} */}
//             </div>
//           </div>
//         </Card>
//       </div>

//     </div>
//   )
// }


import { useEffect, useRef } from 'react';
import Card from '../../components/Card';
import PageTitle from '../../components/PageTitle';
import { BILIBILI_VIDEO_URL } from '../../utils/constants';
// import { aplayerRef } from '../../refs'; 
import './index.scss';
// import APlayer from '../../components/APlayer';

export default function Media() {
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const playerContainer = playerContainerRef.current;
  //   const aplayerElement = aplayerRef.current;

  //   if (playerContainer && aplayerElement) {
  //     playerContainer.appendChild(aplayerElement);
  //   }

  //   return () => {

  //   };
  // }, []);

  return (
    <div className="page-main">
      <div className="page-main-title">
        <PageTitle title="Media" />
      </div>
      <div className="page-main-content">
        <Card>
          <div className="media-card-main">
            {/* <div id="aplayer" className="media-card-main-player" ref={playerContainerRef}>
              <APlayer />
            </div> */}

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
