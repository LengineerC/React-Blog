import { useAppSelector } from '@/redux/hooks';
import AreaDivider from './components/AreaDivider';
import React, { useState } from 'react';
import { CloseOutlined, CopyFilled } from '@ant-design/icons';
import { copyText } from '@/utils/functions';
import { message } from 'antd';

import './index.scss';

const keyAreas = [
  {
    title: '辅音',
    symbols: [
      'p',
      'b',
      't',
      'd',
      'ʈ',
      'ɖ',
      'c',
      'ɟ',
      'k',
      'ɡ',
      'q',
      'ɢ',
      'm',
      'ɱ',
      'ʙ',
      'n',
      'r',
      'ɿ',
      'ɾ',
      'ɳ',
      'ɽ',
      'ɲ',
      'ȵ',
      'ŋ',
      'ɴ',
      'ʀ',
      'ʔ',
      'ʡ',
      'ʢ',
      'ɸ',
      'f',
      'θ',
      'ɬ',
      's',
      'ʃ',
      'ʅ',
      'ɧ',
      'ʆ',
      'ʂ',
      'ç',
      'ɕ',
      'x',
      'χ',
      'ħ',
      'ʜ',
      'h',
      'β',
      'v',
      'ⱱ',
      'ð',
      'ɮ',
      'z',
      'ʒ',
      'ʓ',
      'ʐ',
      'ʝ',
      'ʑ',
      'ɣ',
      'ʁ',
      'ʕ',
      'ɦ',
      'w',
      'ʍ',
      'ʋ',
      'ɹ',
      'ɺ',
      'l',
      'ɫ',
      'ȴ',
      'ɻ',
      'ɭ',
      'ɥ',
      'j',
      'ʎ',
      'ɰ',
      'ʟ',
      'ɓ',
      'ɗ',
      'ᶑ',
      'ʄ',
      'ɠ',
      'ʛ',
      'ʠ',
      'ʘ',
      'ǀ',
      'ǃ',
      '¡',
      'ǂ',
      'ʞ',
    ],
  },
  {
    title: '元音',
    symbols: [
      'i',
      'y',
      'ɨ',
      'ʉ',
      'ɯ',
      'u',
      'ɪ',
      'ʏ',
      'ʊ',
      'e',
      'ø',
      'ɘ',
      'ɵ',
      'ə',
      'ɚ',
      'ɤ',
      'o',
      'ɛ',
      'œ',
      'ɜ',
      'ɝ',
      'ɞ',
      'ɐ',
      'ʌ',
      'ɔ',
      'æ',
      'a',
      'ɶ',
      'ɑ',
      'ɒ',
    ],
  },
  {
    title: '连接符',
    symbols: ['͡', '͜'],
  },
  {
    title: '超音段',
    symbols: ['‿', 'ˈ', 'ˌ', 'ː', 'ˑ', '|', '‖'],
  },
  {
    title: '声调',
    symbols: [
      '˥',
      '˦',
      '˧',
      '˨',
      '˩',
      '̋',
      '́',
      '̄',
      '̀',
      '̏',
      '↗',
      '̌',
      'ꜛ',
      '↘',
      '̂',
      'ꜜ',
      '᷄',
      '᷅',
      '→',
      '᷈',
    ],
  },
  {
    title: '发音修饰',
    symbols: [
      '̝',
      '˔',
      '̞',
      '˕',
      '̹',
      '͗',
      '˒',
      '̜',
      '͑',
      '˓',
      '̟',
      '˗',
      '˖',
      '̠',
      'ⁿ',
      'ˡ',
      '̚',
      'ᵊ',
      'ᶿ',
      'ʰ',
      'ˣ',
      'ʼ',
      '̩',
      '̍',
      '̯',
      '̑',
      '̘',
      '̙',
      '̈',
      '̽',
      '̪',
      '̻',
      '͆',
      '̺',
      'ʷ',
      '̼',
      'ʲ',
      'ˠ',
      'ˁ',
      'ˀ',
      '̴',
      '̥',
      '̊',
      '̬',
      '̤',
      '̰',
      '̃',
      '˞',
      '̆',
    ],
  },
  {
    title: '元符号',
    symbols: ['⸨', '⸩', '(', ')', '[', ']', '/', '{', '}', '⟨', '‹', '⟩', '›', '<', '>'],
  },
];

export default function IPAInput() {
  const [messageApi, contextHolder] = message.useMessage();

  const darkMode = useAppSelector(state => state.ui.darkMode);

  const [ipaValue, setIPAValue] = useState<string>('');
  const [showToolbar, setShowToolbar] = useState<boolean>(false);

  const handleClickKey = (symbol: string) => {
    setIPAValue(prev => prev + symbol);
  };

  const createAreas = () =>
    keyAreas.map((areaData, i) => (
      <React.Fragment key={`area-${i}`}>
        <div className={`keys-area ${darkMode && 'dark'}`}>
          <div className="keys-area-title">{areaData.title}</div>

          <div className="keys-container">
            {areaData.symbols.map(symbol => (
              <span
                key={`${i}-${symbol}`}
                onClick={() => handleClickKey(symbol)}
                className={`key ${darkMode && 'dark'}`}
              >
                {symbol}
              </span>
            ))}
          </div>
        </div>
        {i !== keyAreas.length - 1 && <AreaDivider />}
      </React.Fragment>
    ));

  const handleInputChange = (e: any) => {
    setIPAValue(e.target.value);
  };

  const handleCopy = async () => {
    if (await copyText(ipaValue)) {
      messageApi.open({
        type: 'success',
        content: '已复制到剪贴板',
      });
    } else {
      message.error('复制结果出错');
    }
  };

  const handleClean = () => {
    setIPAValue('');
  };

  return (
    <div className="ipa-main">
      {contextHolder}
      <div
        className="display-area"
        onMouseEnter={() => setShowToolbar(true)}
        onMouseLeave={() => setShowToolbar(false)}
      >
        <textarea
          className={`${darkMode && 'dark'}`}
          value={ipaValue}
          onChange={handleInputChange}
        />

        <div className={`tool-bar ${showToolbar && 'fade-in'}`}>
          <CopyFilled className={`tool-btn ${darkMode && 'dark'}`} onClick={handleCopy} />

          <CloseOutlined className={`tool-btn ${darkMode && 'dark'}`} onClick={handleClean} />
        </div>
      </div>

      <div className="ipa-keys">{createAreas()}</div>
    </div>
  );
}
