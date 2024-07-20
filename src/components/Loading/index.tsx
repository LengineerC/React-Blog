import { useEffect, useRef, useState } from 'react'
import store from '../../redux/store'
import { hideNav, showNav } from '../../redux/actions'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import * as echarts from 'echarts';
import { useAppDispatch } from '../../redux/hooks';

import "./index.scss"

type EChartsOption = echarts.EChartsOption;

export default function Loading() {
  const loadingRef=useRef(null); 
  const dispatch=useAppDispatch();

  useEffect(()=>{
    // store.dispatch(hideNav());
    dispatch(hideNav())
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
      dispatch(showNav());
    }
  },[])

  return (
    <div ref={loadingRef} className={'loading-main'} />
  )
}