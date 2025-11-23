import { useEffect, useRef } from 'react';
import { MUSIC_URL, IRC_TYPE } from '../../utils/constants';

export default function APlayer() {
  const metingRef = useRef<any>(null);
  const effectRan = useRef<any>(null);

  useEffect(() => {
    if (effectRan.current) return;

    const checkAPlayerInstance = () => {
      if (metingRef.current && metingRef.current.aplayer) {
        const aplayerInstance = metingRef.current.aplayer;

        if (aplayerInstance) {
          console.log('Aplayer created successfully');

          if (!IRC_TYPE) {
            aplayerInstance.lrc.hide();
          }
        }
      } else {
        setTimeout(checkAPlayerInstance, 100);
      }
    };

    checkAPlayerInstance();
    effectRan.current = true;

    return () => {
      clearTimeout(checkAPlayerInstance as any);
    };
  }, []);

  return (
    <meting-js
      ref={metingRef}
      auto={MUSIC_URL}
      fixed={true}
      // theme={colorTheme}
      volume={0.5}
      IrcType={IRC_TYPE}
    />
  );
}
