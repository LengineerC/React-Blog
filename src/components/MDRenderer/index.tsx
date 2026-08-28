import { memo, ReactNode, useState } from 'react';
import parser, { domToReact } from 'html-react-parser';
import { Image, message } from 'antd';
import { CopyFilled } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { CODE_BLOCK_COLLAPSED } from '@/utils/constants';
import { copyText } from '@/utils/functions';

import 'highlight.js/scss/atom-one-dark.scss';
import './index.scss';

type Props = {
  html: string;
  darkMode: boolean;
};

// 用于自定义目录跳转，使用markdown-navbar可删
// let headerIndex = 0;
// marked.use({
//   extensions:[
//     {
//       name:"heading",
//       renderer(token){
//         return `<h${token.depth} id="heading-${headerIndex++}">${token.text}</h${token.depth}>`
//       }
//     },
//   ]
// })

interface CodeBlockProps {
  language: string;
  raw: string;
  children: ReactNode;
  darkMode: boolean;
}

function MarkdownImage({ attribs }: { attribs: Record<string, string> }) {
  return (
    <span className="markdown-image-container">
      <Image
        src={attribs.src}
        alt={attribs.alt}
        title={attribs.title}
        style={{ maxWidth: '100%', cursor: 'zoom-in' }}
      />
    </span>
  );
}

function isMarkdownImage(domNode: any) {
  return domNode?.name === 'img' && domNode.attribs?.['data-markdown-image'] === 'true';
}

function CodeBlock({ language, raw, darkMode, children }: CodeBlockProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isCollapsed, setIsCollapsed] = useState(CODE_BLOCK_COLLAPSED);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const copyCode = async () => {
    if (await copyText(raw)) {
      messageApi.success('已复制到剪贴板');
    } else {
      messageApi.error('复制结果出错');
    }
  };

  return (
    <div className="code-block-wrapper">
      {contextHolder}
      <div className={`code-header ${isCollapsed && 'collapsed'}`}>
        <div className="language">{language.toLowerCase()}</div>

        <div className="operations">
          <CopyFilled className={`copy-btn ${darkMode && 'dark'}`} onClick={copyCode} />
          {isCollapsed ? (
            <FontAwesomeIcon
              className="collapse-btn"
              icon={faAngleDown}
              onClick={toggleCollapsed}
            />
          ) : (
            <FontAwesomeIcon className="collapse-btn" icon={faAngleUp} onClick={toggleCollapsed} />
          )}
        </div>
      </div>

      <div className={`code-body ${isCollapsed && 'collapsed'}`}>
        <pre style={{ margin: '0' }}>
          <code className={`hljs language-${language}`}>{children}</code>
        </pre>
      </div>
    </div>
  );
}

function MDRenderer({ html, darkMode }: Props) {
  return (
    <div className={darkMode ? 'markdown-body-dark' : 'markdown-body'}>
      <div>
        {parser(html, {
          replace: (domNode: any) => {
            // marked在img标签外会裹一层p，antd-Image包含div，防止p中出现div的特殊处理
            if (domNode.name === 'p') {
              if (
                domNode.children &&
                domNode.children.length === 1 &&
                isMarkdownImage(domNode.children[0])
              ) {
                const img = domNode.children[0];
                return <MarkdownImage attribs={img.attribs} />;
              }
            }

            if (isMarkdownImage(domNode)) {
              return <MarkdownImage attribs={domNode.attribs} />;
            }

            if (domNode.name === 'pre') {
              // 手动包了一层<code>来存储raw-code
              const codeNode = domNode.children[0].children.filter(
                (n: any) => n.type !== 'text',
              )[0];

              if (codeNode && codeNode.name === 'code') {
                const className = codeNode.attribs.class || '';
                const languageMatch = className.match(/language-(\w+)/);
                const language = languageMatch ? languageMatch[1] : 'plaintext';
                const rawCode = decodeURIComponent(codeNode.attribs['data-raw'] || '');

                return (
                  <CodeBlock darkMode={darkMode} language={language} raw={rawCode}>
                    {domToReact(codeNode.children)}
                  </CodeBlock>
                );
              }
            }
          },
        })}
      </div>
    </div>
  );
}

export default memo(MDRenderer);
