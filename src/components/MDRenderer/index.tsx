import { ReactNode, useMemo, useState } from 'react';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import markedKatex from 'marked-katex-extension';
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
  markdown: string;
  darkMode: boolean;
};

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      const normalizedCode = code.replace(/\r\n?/g, '\n');
      const highlightedCode = hljs
        .highlight(normalizedCode, { language })
        .value.replace(/\r\n?/g, '\n');

      const rawLines = normalizedCode.split('\n');
      const highlightedLines = highlightedCode.split('\n');

      const spanTagPattern = /<\/?span\b[^>]*>/g;
      let carryStack: string[] = [];

      const processedCodeLines = rawLines.map((_, index) => {
        const startStack = [...carryStack];
        const prefix = startStack.join('');

        const lineHtml = highlightedLines[index] ?? '';
        const safeLine = lineHtml === '' ? '&nbsp;' : lineHtml;

        const tagsInLine = safeLine.match(spanTagPattern) ?? [];
        tagsInLine.forEach(tag => {
          if (tag.startsWith('</')) {
            carryStack.pop();
          } else {
            carryStack.push(tag);
          }
        });

        const endStack = [...carryStack];
        const suffix = endStack
          .slice()
          .reverse()
          .map(() => '</span>')
          .join('');

        return `<div class="code-row">
          <span class="line-num" data-num="${index + 1}"></span>
          <span class="code-content">${prefix}${safeLine}${suffix}</span>
        </div>`;
      });

      const raw = encodeURIComponent(code);

      return `<code class="hljs language-${language}" data-raw="${raw}">${processedCodeLines.join('')}</code>`;
    },
  }),
);
marked.use(markedKatex());

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

export default function MDRenderer({ markdown, darkMode }: Props) {
  const content = useMemo(() => {
    // 去掉 yaml front matter
    const cleanedMarkdown = markdown.replace(/^-{3}[\s\S]*?-{3}/, '');
    return marked.parse(cleanedMarkdown) as string;
  }, [markdown]);

  return (
    <div className={darkMode ? 'markdown-body-dark' : 'markdown-body'}>
      <div>
        {parser(content, {
          replace: (domNode: any) => {
            // marked在img标签外会裹一层p，antd-Image包含div，防止p中出现div的特殊处理
            if (domNode.name === 'p') {
              if (
                domNode.children &&
                domNode.children.length === 1 &&
                domNode.children[0].name === 'img'
              ) {
                const img = domNode.children[0];
                return (
                  <Image
                    src={img.attribs.src}
                    alt={img.attribs.alt}
                    title={img.attribs.title}
                    style={{ maxWidth: '100%', cursor: 'zoom-in' }}
                  />
                );
              }
            }

            if (domNode.name === 'img') {
              return (
                <Image
                  src={domNode.attribs.src}
                  alt={domNode.attribs.alt}
                  title={domNode.attribs.title}
                  style={{ maxWidth: '100%', cursor: 'zoom-in' }}
                />
              );
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
