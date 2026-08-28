# **A React Router SSG blog**

## 🖋️ 项目简介

- 一个基于 React Router Framework Mode 的响应式个人博客，构建后可作为纯静态网站部署
- 首页、文章、归档、标签和分类页面在构建阶段生成完整 HTML，无需 JavaScript 也能读取正文
- 文章支持markdown语法，latex支持
- 支持夜间模式切换
- APlayer音乐播放器
- **主要部分功能可配置，配置文件路径`src/utils/constants.ts`**

## 📁 public文件夹介绍

### `./`

- `aboutme.md` 关于页的内容(必要，文件不存在则手动建立)

### `./posts`

Markdown文章源码目录，支持多级分类目录，位于`posts`根目录的文件会被归类为“未分类”。文章ID使用相对于`posts`的完整路径，因此不同分类下可以存在同名文章。

例如：

```text
public/posts/react/hooks/use-context.md
public/posts/vue/hooks/use-context.md
```

对应的文章ID分别为`react/hooks/use-context`和`vue/hooks/use-context`，不会互相覆盖。页面显示的文章分类取Markdown文件的直接父目录名称。

### `./post-images`

文章的本地图片目录，目录结构与`posts`中的文章路径保持一致，并以Markdown文件名作为该文章的图片库目录：

```text
public/posts/react/hooks/use-context.md
public/post-images/react/hooks/use-context/cover.png
```

文章中可直接使用相对于图片库的文件名：

```md
![封面](cover.png)
```

构建时会转换为`/post-images/react/hooks/use-context/cover.png`。图片库内部不需要继续划分目录；网络图片应使用完整的`http://`或`https://`地址，构建时会保持原地址不变。

### `./generated`

Markdown 编译阶段生成的中间内容，请勿手动修改：

- `posts/<分类路径>/<文章名>.json`：预编译后的HTML、一级至六级标题TOC和文章字数
- `about.json`：预编译后的关于页内容

React Router 构建时会读取这些 JSON，为每篇文章生成包含完整正文的静态 HTML 和客户端导航所需的 `.data` 文件。浏览器不再请求或解析 Markdown。每次执行`npm run gen-posts-config`都会重新生成该目录中的文章内容。

### SSG输出结构

`npm run build`会将可部署文件输出到`build/client`。例如：

```text
build/client/index.html
build/client/archives/index.html
build/client/post/detail/react/hooks/use-context/index.html
build/client/tags/React/index.html
```

文章使用普通路径而不是Hash路径，GitHub Pages可以直接访问每个预生成的`index.html`。

### `./json`

- `posts.json` 文章配置文件(可自动生成)
- `categories.json` 文章分类信息(可自动生成)
- `tags.json` 文章标签信息(可自动生成)
- `friends.json` 友链信息(手动填写，文件不存在则手动建立)

### `./libs`

修改过后的[APlayer](https://github.com/rRemix/APlayer)和[MetingJS](https://github.com/metowolf/MetingJS)源码，防止路由切换后程序崩溃

## 🛠️ 功能版本

- _`node.js`: 20+_
- `react`: 19.2.x
- `react-router`: 7.18.3（Framework Mode）
- `vite`: 7.x
- `antd`: 5.18.0
- `axios`: 1.7.2
- `react-router-dom`: 7.18.3
- `sass`: 1.77.4
- `redux`: "^5.0.1"
- `redux-saga`: "^1.0.3"
- `highlight.js`: 11.9.0
- `marked`: 13.0.0
- `echarts`: 5.5.0
- ...

## 🔑 使用

### 安装依赖

- `npm install`
- 安装字体裁剪工具：`python -m pip install fonttools brotli`

`npm start`和`npm run build`会根据当前页面及文章实际使用的字符生成`public/generated/font-subset.woff2`。完整字体仅在进入Unicode转换工具时按需加载。

### 修改域名

- 修改`scripts/sitemap.js`中的`baseUrl`为网站的根网址，网址末尾不要加`/`

### 新建文章

- 未分类文章：`npm run create-post -- "文件名"`
- 分类文章：`npm run create-post -- "react/hooks/文件名"`

命令会同时创建Markdown文件和对应的`public/post-images`图片库目录。路径中的空格会被转换为下划线。

### 生成文章配置文件

- `npm run gen-posts-config`

该命令会读取`public/posts`中的Markdown，并生成文章摘要、HTML、TOC、字数、文章列表、标签列表和分类列表。YAML front matter中的`title`缺失或为空时，文章标题自动使用“无标题”。

### 启动应用

- `npm start`

也可以使用`npm run dev`。启动前会自动更新文章、分类、摘要、TOC和字体子集。

### 构建应用

- `npm run build`

构建会完成以下工作：

1. 预编译Markdown和关于页内容
2. 生成标签、分类和文章索引
3. 生成干净URL的`sitemap.xml`
4. 为全部公开路由和文章生成静态HTML
5. 为GitHub Pages生成`404.html`和`.nojekyll`

本地检查构建结果：

```bash
npm run preview
curl http://localhost:4173/post/detail/react/hooks/use-context/
```

即使禁用JavaScript，文章标题、正文和基本样式也应存在。可以用正文中的独有句子检查：

```bash
curl -s http://localhost:4173/post/detail/react/hooks/use-context/ | grep '正文中的独有句子'
```

### _Github Pages部署_

1. 添加远程仓库地址
2. 确认`scripts/sitemap.js`和`app/seo.ts`中的站点域名正确
3. 执行`npm run deploy`

部署目录为`build/client`。所有站内链接、canonical和sitemap均使用不带`#`的普通URL。

## 🐞Bugs

- [x] 苹果建站时间NaN
- [x] 苹果About页avatar位置错误
- [x] 苹果background-attachment: fixed;失效
- [x] 手机端复制文章连接失败
- [ ] MarkdownNavbar导致的文章页面滑动状态更新过快测试环境报错和性能降低
- [x] Github Pages部署状态下偶尔出现的路由跳转路径错误

---

## TODO:

- [x] 移动端适配
- [x] 夜间模式
- [x] Nav
- [x] MobileMenu
- [x] Footer
- [x] 代码高亮
- [x] md文件获取
- [x] Post
- [x] Post lock
- [x] Tags
- [x] Categories
- [x] Archives
- [x] About
- [x] Media
- [x] 音乐播放器
- [x] Friends
- [ ] 评论系统？
- [ ] ...
