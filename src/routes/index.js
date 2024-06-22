import { lazy } from "react"
// import Loading from "../components/Loading/index";

const Home=lazy(()=>import("../pages/Home/index.tsx"));
const TagsPage=lazy(()=>import("../pages/TagsPage/index.tsx"));
const About=lazy(()=>import("../pages/About/index.tsx"));
const ErrorPage=lazy(()=>import("../pages/404/index.tsx"));
const Post=lazy(()=>import("../pages/Post/index.tsx"));

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
        path:"tags/",
        element: <TagsPage />
    },
    {
        path:"tags/:tag",
        element: <TagsPage />
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