import React,{useEffect, useState} from 'react'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

import "highlight.js/scss/atom-one-dark.scss"
import "./index.scss"

type Props = {
  markdown: string,
  limit?:number,
  showLimitContent:boolean,
}

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

// const markedOptions = {
//   renderer: new marked.Renderer(),
//   gfm: true,
//   breaks: true,
//   // highlight: (code: any) => hljs.highlightAuto(code).value,
// };

// marked.setOptions(markedOptions);

export default function MDRender({ markdown,limit=100,showLimitContent }: Props) {
  const [content, setContent] = useState<any>('');

  useEffect(() => {
    // 去掉 yaml front matter
    let cleanedMarkdown: string = markdown.replace(/^-{3}[\s\S]*?-{3}/, '');
    
    if (showLimitContent) {
      // 移除 HTML 标签
      let plainText = cleanedMarkdown.replace(/<[^>]*>/g, '');

      if (plainText.length > limit) {
        plainText = plainText.substring(0, limit) + '...';
      }
      setContent(plainText);
    } else {
      // 使用 marked 解析 markdown
      let html = marked.parse(cleanedMarkdown).toString().replace(/<pre>/g,"<pre id='hljs'>");
      console.log(html);
      
      setContent(html);
    }
  }, [markdown, limit, showLimitContent]);

  return (
    <div className={showLimitContent?"":"markdown-body"}>
      {showLimitContent ? (
        <div>{content}</div> 
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} /> 
      )}
    </div>
  );
}