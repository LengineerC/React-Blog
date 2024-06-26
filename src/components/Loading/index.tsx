import React, { useEffect, useRef } from 'react'
import store from '../../redux/store'
import { hideNav, showNav } from '../../redux/actions'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import "./index.scss"

// //TODO:用echarts加载动画替换
// export default function Loading() {
//   useEffect(()=>{
//     store.dispatch(hideNav());

//     return()=>{
//       store.dispatch(showNav());
//     }
//   },[])

//   return (
//     <div className='loading-main'>
//       <div className='loading-icon'>
//         <FontAwesomeIcon icon={faSpinner}/>
//       </div>
//       <div className='loading-title'>
//         Loading...
//       </div>
//     </div>
//   )
// }

import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

export default function Loading() {
  const loadingRef=useRef(null); 

  useEffect(()=>{
    store.dispatch(hideNav());
    let loading=echarts.init(loadingRef.current);
    const option:EChartsOption = {
      graphic: {
        elements: [
          {
            type: 'group',
            left: 'center',
            top: 'center',
            children: new Array(7).fill(0).map((val, i) => ({
              type: 'rect',
              x: i * 20,
              shape: {
                x: 0,
                y: -40,
                width: 10,
                height: 80
              },
              style: {
                fill: '#ffffff'
              },
              keyframeAnimation: {
                duration: 1000,
                delay: i * 200,
                loop: true,
                keyframes: [
                  {
                    percent: 0.5,
                    scaleY: 0.3,
                    easing: 'cubicIn'
                  },
                  {
                    percent: 1,
                    scaleY: 1,
                    easing: 'cubicOut'
                  }
                ]
              }
            }))
          }
        ]
      }
    };

    loading.setOption(option);

    return()=>{
      store.dispatch(showNav());
    }
  },[])

  return (
    <div ref={loadingRef} className='loading-main' />
  )
}