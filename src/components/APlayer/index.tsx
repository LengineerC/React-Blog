import { useEffect, useRef, useState } from 'react';
import { MUSIC_URL, IRC_TYPE } from '../../utils/constants';
import { loadAPlayerAssets } from '../../utils/loadAPlayerAssets';

type Props = {
  fixed?: boolean;
  theme?: string;
};

export default function APlayer({ fixed = true, theme }: Props) {
  const metingRef = useRef<any>(null);
  const destroyTimerRef = useRef<number>();
  const [assetsReady, setAssetsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadAPlayerAssets()
      .then(() => {
        if (!cancelled) setAssetsReady(true);
      })
      .catch(error => {
        console.error('播放器资源加载失败', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!assetsReady) return;

    if (destroyTimerRef.current) {
      window.clearTimeout(destroyTimerRef.current);
    }

    let checkTimer: number | undefined;
    let attemptsRemaining = 100;
    const metingElement = metingRef.current;

    const checkAPlayerInstance = () => {
      const aplayerInstance = metingElement?.aplayer;

      if (aplayerInstance) {
        if (!IRC_TYPE) {
          aplayerInstance.lrc?.hide();
        }

        return;
      }

      attemptsRemaining -= 1;
      if (attemptsRemaining > 0) {
        checkTimer = window.setTimeout(checkAPlayerInstance, 100);
      } else {
        console.error('播放器初始化超时');
      }
    };

    checkAPlayerInstance();

    return () => {
      if (checkTimer) window.clearTimeout(checkTimer);

      const aplayerInstance = metingElement?.aplayer;
      destroyTimerRef.current = window.setTimeout(() => {
        aplayerInstance?.destroy?.();
      }, 0);
    };
  }, [assetsReady]);

  if (!assetsReady) return null;

  return (
    <meting-js
      ref={metingRef}
      auto={MUSIC_URL}
      {...(fixed ? { fixed: true } : {})}
      theme={theme}
      volume={0.5}
      IrcType={IRC_TYPE}
    />
  );
}
