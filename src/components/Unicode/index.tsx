import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import { CopyFilled } from "@ant-design/icons";
import { copyText } from "@/utils/functions";

import "./index.scss";

enum CONVERT_MODE {
  TEXT2UNICODE = 0,
  UNICODE2TEXT
}

export default function Unicode() {
  const darkMode = useAppSelector(state => state.darkMode);
  const [messageApi, contextHolder] = message.useMessage();

  const [convertMode, setConvertMode] = useState<CONVERT_MODE>(CONVERT_MODE.TEXT2UNICODE);
  const [inputText, setInputText] = useState<string>("");
  const [resultText, setResultText] = useState<string>("");

  const toggleConvertMode = () => {
    if (convertMode === CONVERT_MODE.TEXT2UNICODE) {
      setConvertMode(CONVERT_MODE.UNICODE2TEXT);
    } else if (convertMode === CONVERT_MODE.UNICODE2TEXT) {
      setConvertMode(CONVERT_MODE.TEXT2UNICODE);
    }
  }

  const copyResult = async () => {
    if (await copyText(resultText)) {
      messageApi.open({
        type: "success",
        content: "已复制到剪贴板",
      });
    } else {
      message.error("复制结果出错");
    }
  }

  const convertToUnicode = () => {
    let result = '';

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i];
      const unicode = char.charCodeAt(0).toString(16).toUpperCase();
      const paddedUnicode = unicode.padStart(4, '0');

      result += `\\u${paddedUnicode}`;
    }

    setResultText(result);
  }

  const convertToCharacter = () => {
    let result = '';

    const unicodeArray = inputText.match(/\\u[0-9a-fA-F]{4}/g);

    if (unicodeArray) {
      for (let i = 0; i < unicodeArray.length; i++) {
        const unicode = parseInt(unicodeArray[i].substr(2), 16);
        const char = String.fromCharCode(unicode);
        result += char;
      }
    } else {
      result = '输入格式不正确，请确保使用\\u格式表示Unicode码点。';
    }

    setResultText(result);
  }

  const handleConvert = () => {
    if (convertMode === CONVERT_MODE.TEXT2UNICODE) {
      convertToUnicode();
    } else {
      convertToCharacter();
    }
  }

  return (
    <div className="unicode-main">
      {contextHolder}
      <div className="textarea-container">
        <div className={`label ${darkMode && "dark"}`}>输入:</div>

        <textarea
          className={`${darkMode && "dark"}`}
          placeholder="请在此输入"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
      </div>

      <div className="center">
        <div className="convert-switcher">
          <div className={`switcher-label ${darkMode && "dark"}`}>
            {convertMode === CONVERT_MODE.TEXT2UNICODE ? "文" : "U"}
          </div>

          <div
            className={`switcher-btn ${darkMode && "dark"}`}
            onClick={toggleConvertMode}
          >
            <FontAwesomeIcon
              icon={faRepeat}
              color={darkMode ? "#ffffffcc" : "#001447"}
              size="xl"
            />
          </div>

          <div className={`switcher-label ${darkMode && "dark"}`}>
            {convertMode === CONVERT_MODE.UNICODE2TEXT ? "文" : "U"}
          </div>
        </div>

        <div
          className={`convert-btn ${darkMode && "dark"}`}
          onClick={handleConvert}
        >
          转换
        </div>
      </div>

      <div className="textarea-container">
        <div style={{
          display: "flex",
          flexDirection: "row"
        }}>
          <div className={`label ${darkMode && "dark"}`}>
            转换结果:
          </div>

          <CopyFilled
            className={`copy-btn ${darkMode && "dark"}`}
            onClick={copyResult}
          />
        </div>

        <textarea
          className={`${darkMode && "dark"}`}
          value={resultText}
          disabled
        />
      </div>
    </div>
  )
}
