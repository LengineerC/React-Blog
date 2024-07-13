import { lazy } from "react"
// import Loading from "../components/Loading/index";

const Home=lazy(()=>import("../pages/Home/index.tsx"));
const TagsPage=lazy(()=>import("../pages/TagsPage/index.tsx"));
const TagDetail=lazy(()=>import("../pages/TagDetail/index.tsx"));
const CategoriesPage=lazy(()=>import("../pages/CategoriesPage/index.tsx"));
const CategoriesDetail=lazy(()=>import("../pages/CategoriesDetail/index.tsx"));
const About=lazy(()=>import("../pages/About/index.tsx"));
const ErrorPage=lazy(()=>import("../pages/404/index.tsx"));
const Post=lazy(()=>import("../pages/Post/index.tsx"));
const PostsPage=lazy(()=>import("../pages/PostsPage/index.tsx"));
const Archives=lazy(()=>import("../pages/Archives/index.tsx"));
const Friends=lazy(()=>import("../pages/Friends/index.tsx"));

// 播放器问题暂时不采用懒加载并移出路由表，路由配置移入Main
const Media=lazy(()=>import("../pages/Media/index.tsx"));

const routes=[
    {
        path:"/",
        element:<Home />
    },
    {
        path:"post/detail/:id",
        element:<Post />
    },
    {
        path:"tags",
        element: <TagsPage />
    },
    {
        path:"tags/:tag",
        element: <TagDetail />
    },
    {
        path:"categories",
        element:<CategoriesPage />
    },
    {
        path:"categories/:category",
        element:<CategoriesDetail />
    },
    {
        path:"posts",
        element:<PostsPage />
    },
    {
        path:"archives",
        element:<Archives />
    },
    // 播放器问题暂时不采用懒加载并移出路由表，路由配置移入Main
    {
        path:"media",
        element:<Media />
    },
    {
        path:"friends",
        element:<Friends />
    },
    {
        path:"about",
        element:<About />
    },
    // {
    //     path:"loading",
    //     element:<Loading/>
    // },
    // {
    //     path:"404",
    //     element:<ErrorPage />
    // },
    {
        path:"*",
        element:<ErrorPage />
    },
];

export default routes;