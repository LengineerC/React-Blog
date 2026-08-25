# **A React-based blog frontend**

## 🖋️ 项目简介

- 一个基于React的响应式个人blog系统的前端部分, **可脱离后端独立运行**
- 文章支持markdown语法，latex支持
- 支持夜间模式切换
- APlayer音乐播放器
- **主要部分功能可配置，配置文件路径`src/utils/contants.ts`**

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

构建阶段生成的文章内容，请勿手动修改：

- `posts/<分类路径>/<文章名>.json`：预编译后的HTML、一级至六级标题TOC和文章字数
- `about.json`：预编译后的关于页内容

浏览器运行时只请求这些JSON，不再请求或解析Markdown。每次执行`npm run gen-posts-config`都会重新生成该目录中的文章内容。

### `./json`

- `posts.json` 文章配置文件(可自动生成)
- `categories.json`  文章分类信息(可自动生成)
- `tags.json`  文章标签信息(可自动生成)
- `friends.json` 友链信息(手动填写，文件不存在则手动建立)

### `./libs`

修改过后的[APlayer](https://github.com/rRemix/APlayer)和[MetingJS](https://github.com/metowolf/MetingJS)源码，防止路由切换后程序崩溃

## 🛠️ 功能版本

- *`node.js`: 18+*
- `react`: 18.3.1
- `antd`: 5.18.0
- `axios`: 1.7.2
- `react-router-dom`: 6.23.1
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

### 构建应用

- `npm run build`

### *Github Pages部署*
1. 添加远程仓库地址
2. 修改`./src/utils/constants.ts`的`DEPLOY_ON_GITHUB_PAGES`配置为`true`
3. 执行`npm run deploy`

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
