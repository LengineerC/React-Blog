import React,{useEffect, useState} from 'react'
import { Marked, Renderer } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

import "highlight.js/scss/atom-one-dark.scss"
import "./index.scss"
import store from '../../redux/store'
import { saveSelectedPostHtml } from '../../redux/actions'
// import './hljs.scss'

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
  }),
);


//用于自定义目录跳转，使用markdown-navbar可删
// let headerIndex = 0;
// marked.use({
//   extensions:[{
//     name:"heading",
//     renderer(token){
//       return `<h${token.depth} id="heading-${headerIndex++}">${token.text}</h${token.depth}>`
//     }
//   }]
// })

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
    
    if (showLimitContent && markdown!=='') {
      // 移除 HTML 标签
      let plainText = cleanedMarkdown.replace(/<[^>]*>/g, '');
      // console.log(plainText);

      if (plainText.length > limit) {
        plainText = plainText.substring(0, limit) + '...';
        // console.log(plainText);
        
      }
      setContent(plainText);
    } else {
      // pre标签添加hljs标签，匹配自定义hljs样式
      // let html = marked.parse(cleanedMarkdown).toString().replace(/<pre>/g,"<pre id='hljs'>");
      
      let html = marked.parse(cleanedMarkdown) as string;
      // console.log(html);

      //如果自实现目录取消注释
      // store.dispatch(saveSelectedPostHtml(html));
      
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
