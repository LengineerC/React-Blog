# **A React-based blog frontend**

## 🖋️ 项目简介

- 一个基于React的响应式个人blog系统的前端部分, **可脱离后端独立运行**
- 文章支持markdown语法，latex支持
- 支持夜间模式切换
- APlayer音乐播放器
- 主要部分功能可配置，配置文件路径`src/utils/contants.ts`

## 📁 public文件夹介绍
### `./`
- `aboutme.md` 关于页的内容(必要，文件不存在则手动建立)
- `posts` 文章文件夹
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
### 新建文章
- `npm run create-post "文件名"`
### 生成文章配置文件
- `npm run gen-posts-config`
### 启动应用
- `npm start`
### 构建应用
- `npm build`

## 🐞Bugs
- [x] 苹果建站时间NaN
- [x] 苹果About页avatar位置错误
- [x] 苹果background-attachment: fixed;失效
- [x] 手机端复制文章连接失败
- [ ] MarkdownNavbar导致的文章页面滑动状态更新过快测试环境报错和性能降低

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
- [ ] 连接后端
- [ ] 评论系统？
- [ ] ...
- [ ] 后台管理系统