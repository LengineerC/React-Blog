import axios from 'axios'
import { useEffect, useState } from 'react'
import { HITOKOTO_GET_ENABLE, SUB_TITLE_ENABLE, SUB_TITLE_TEXT } from '../../utils/constants';
import './index.scss'

const jinrishici = require('jinrishici');
export default function Hitokoto() {
  const [sentence,setSentence]=useState<string>(SUB_TITLE_TEXT);
  
  useEffect(()=>{
    if(HITOKOTO_GET_ENABLE && SUB_TITLE_ENABLE){
      axios.get('https://v1.hitokoto.cn')
      .then(({data}) => {
        console.log(data);
        setSentence(data.hitokoto);
      })
      .catch(e=>{
        console.log("hitokoto获取失败",e);
        console.log("获取今日诗词");
        jinrishici.load((result: any) => {
          console.log(result);
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

// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { HITOKOTO_GET_ENABLE, SUB_TITLE_ENABLE, SUB_TITLE_TEXT } from '../../utils/constants';
// import './index.scss';

// const jinrishici = require('jinrishici');

// export default function Hitokoto() {
//   const [sentence, setSentence] = useState<string>(SUB_TITLE_TEXT);

//   useEffect(() => {
//     if (HITOKOTO_GET_ENABLE && SUB_TITLE_ENABLE) {
//       axios.get('https://v1.hitokoto.cn')
//         .then(({ data }) => {
//           console.log(data);
//           setSentence(data.hitokoto);
//           injectDynamicStyles(data.hitokoto.length);
//         })
//         .catch(e => {
//           console.log("hitokoto获取失败", e);
//           console.log("获取今日诗词");
//           jinrishici.load((result: any) => {
//             console.log(result);
//             setSentence(result.data.content);
//             injectDynamicStyles(result.data.content.length);
//           }, (errData: any) => {
//             console.log(errData);
//           });
//         });
//     }else injectDynamicStyles(SUB_TITLE_TEXT.length);
//   }, []);

//   const injectDynamicStyles = (text: string) => {
//     const hitokotoElement = hitokotoRef.current;
//     if (hitokotoElement) {
//       const fontSize = window.getComputedStyle(hitokotoElement).fontSize;
//       const fontSizeNumber = parseFloat(fontSize);
//       const length = text.length * fontSizeNumber;

//       const styleElement = document.createElement('style');
//       styleElement.textContent = `
//         .hitokoto {
//           animation: content-slide-in 2s steps(${text.length}) forwards;
//         }
//         @keyframes content-slide-in {
//           from {
//             width: 0;
//           }
//           to {
//             width: ${length}px;
//           }
//         }
//       `;
//       document.head.appendChild(styleElement);
//     }
//   };

//   return (
//     <div className='hitokoto'>
//       {sentence}
//     </div>
//   );
// }