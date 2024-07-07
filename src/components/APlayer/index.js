import { useEffect, useState } from 'react';
import { MUSIC_URL, IRC_TYPE } from "../../utils/constants";
import { useLocation } from 'react-router-dom';

export default function APlayer(){
  // const [isCreated,setIsCreated]=useState(false);
  // const location=useLocation();

  // useEffect(()=>{
  //   const aplayerContainer=document.getElementById("aplayer");
  //   console.log(aplayerContainer);

  //   if(aplayerContainer){
  //     let aplayerElement=<></>;

  //     if(!isCreated){
  //       aplayerElement=document.createElement('meting-js');
  //       aplayerElement.setAttribute("auto",MUSIC_URL);

  //       setIsCreated(true);
  //     }

  //     aplayerContainer.appendChild(aplayerElement);
  //   }

  // },[location])

  useEffect(()=>{
    //TODO: 自定义APlayer

    // const metingElement=document.querySelector('meting-js');
    // console.log(metingElement);
  })

  // return null;
  return(
    <meting-js 
      auto={MUSIC_URL}
      fixed={true}
      theme="#67abff"
      volume={0.5}
      IrcType={IRC_TYPE}
    />
  )
}