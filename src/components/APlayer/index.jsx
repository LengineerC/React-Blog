import { useEffect, useRef } from 'react';
import { MUSIC_URL, IRC_TYPE } from "../../utils/constants";
// import store from '../../redux/store';
// import { saveAPlayer } from '../../redux/actions';

export default function APlayer(){
  // const [colorTheme,setColorTheme]=useState(props.theme);
  const metingRef=useRef(null);
  const effectRan=useRef(null);

  useEffect(() => {
    if(effectRan.current) return;

    const checkAPlayerInstance = () => {
      if (metingRef.current && metingRef.current.aplayer) {
        const aplayerInstance = metingRef.current.aplayer;
        // console.log('APlayer instance:', aplayerInstance);

        if (aplayerInstance) {
          console.log("Aplayer created successfully");

          // store.dispatch(saveAPlayer(aplayerInstance));

          if(!IRC_TYPE){
            aplayerInstance.lrc.hide();
          }
        }
      } else {
        setTimeout(checkAPlayerInstance, 100);
      }
    };

    checkAPlayerInstance();
    effectRan.current=true;

    return () => {
      clearTimeout(checkAPlayerInstance);
    };
  }, []);

  return(
    <meting-js 
      ref={metingRef}
      auto={MUSIC_URL}
      fixed={true}
      // theme={colorTheme}
      volume={0.5}
      IrcType={IRC_TYPE}
    />
  )
}