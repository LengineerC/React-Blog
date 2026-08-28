import axios from 'axios';
import { useEffect, useState } from 'react';
import { HITOKOTO_GET_ENABLE, SUB_TITLE_ENABLE, SUB_TITLE_TEXTS } from '../../utils/constants';
import { genRandomInt } from '@lengineerc/utils';
import { load as loadJinrishici } from 'jinrishici';
import './index.scss';

export default function Hitokoto() {
  const [sentence, setSentence] = useState<string>(SUB_TITLE_TEXTS[0]);

  useEffect(() => {
    setSentence(SUB_TITLE_TEXTS[genRandomInt(0, SUB_TITLE_TEXTS.length - 1)]);

    if (HITOKOTO_GET_ENABLE && SUB_TITLE_ENABLE) {
      axios
        .get('https://v1.hitokoto.cn')
        .then(({ data }) => {
          setSentence(data.hitokoto);
        })
        .catch(e => {
          console.log('hitokoto获取失败', e);
          console.log('获取今日诗词');
          loadJinrishici(
            (result: any) => {
              setSentence(result.data.content);
            },
            (errData: any) => {
              console.log(errData);
            },
          );
        });
    }
  }, []);

  return (
    <div
      className="hitokoto"
      style={{ '--sentence-length': `${sentence.length}ch` } as React.CSSProperties}
    >
      {sentence}
    </div>
  );
}
