//站点标题
export const SITE_TITLE:string="LengineerC's blog";

//判断移动设备的宽度边界(px)，修改后base.scss里面对应的也要修改
export const MOBILE_MAX_WIDTH:number=992;

//网站作者
export const AUTHOR:string="LengineerC";

//网站开始日期（严格按照yyyy-mm-dd）
export const WEBSITE_START_DATE:string="2024-06-08";

//启用副标题
export const SUB_TITLE_ENABLE:boolean=true;

//网站默认主题模式(true为夜间模式，false为亮色模式)
export const SITE_DEFAULT_THEME_MODE:boolean=false;

//副标题默认内容
export const SUB_TITLE_TEXT:string="All tragedies crased, I see only wonders.";

//公告栏内容
export const NOTICE_CARD_TEXT:string="网站正在建设中...";

//Hitokoto获取，关闭使用默认副标题内容
export const HITOKOTO_GET_ENABLE:boolean=false; 

//个人信息
export const EMAIL:string="lengineerc@outlook.com";
export const QQ:string="398908838";
export const BILIBILI_LINK:string="https://space.bilibili.com/92665721";

//自定义目录生效：目录检测标题级数,(不超过5级)，使用markdown-navbar配置无效
export const MAX_TOC_HEADING:number=2;
export const TOC_HEADING_CONFIG:string="h2,h3,h4,h5";

//Post页是否自动开启目录
export const DEFAULT_SHOW_TOC:boolean=true;

// 显示ClockCard
export const SHOW_CLOCK_CARD:boolean=true;

//音乐播放器服务器: netease, tencent, kugou, xiami, baidu
// export const MUSIC_SERVER:string="netease";

//音乐播放器歌单url(根据服务器设置)，详情见https://github.com/metowolf/MetingJS
export const MUSIC_URL:string="https://music.163.com/playlist?id=8741983740";

//是否显示吸底音乐播放器
export const SHOW_APLAYER:boolean=false;

// 吸底音乐播放器是否默认显示歌词
export const IRC_TYPE:boolean=false;

// B站视频地址
export const BILIBILI_VIDEO_URL:string="//player.bilibili.com/player.html?isOutside=true&aid=43083956&bvid=BV1Pb411S7Tu&cid=75540675&p=1";

// 时间轴的github用户名和仓库名
export const GITHUB_REPO={
    owner:"LengineerC",
    repo:"React-blog"
}