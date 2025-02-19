import axios from 'axios'
import { useEffect, useState } from 'react'
import { HITOKOTO_GET_ENABLE, SUB_TITLE_ENABLE, SUB_TITLE_TEXTS } from '../../utils/constants';
import './index.scss'
import { genRandomInt } from '@/utils/functions';

const jinrishici = require('jinrishici');
export default function Hitokoto() {
  const [sentence,setSentence]=useState<string>(SUB_TITLE_TEXTS[genRandomInt(0,SUB_TITLE_TEXTS.length-1)]);
  
  useEffect(()=>{
    if(HITOKOTO_GET_ENABLE && SUB_TITLE_ENABLE){
      axios.get('https://v1.hitokoto.cn')
      .then(({data}) => {
        setSentence(data.hitokoto);
      })
      .catch(e=>{
        console.log("hitokoto获取失败",e);
        console.log("获取今日诗词");
        jinrishici.load((result: any) => {
          setSentence(result.data.content);
        }, (errData:any) => {
          console.log(errData);
        });
      })
    }
  
  },[])

  return (
    <div className='hitokoto' style={{'--sentence-length':`${sentence.length}ch`} as React.CSSProperties}>
      {sentence}
    </div>
  )
}