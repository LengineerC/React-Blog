import { lazy } from "react"
// import Loading from "../components/Loading/index";

const Home=lazy(()=>import("../pages/Home/index.tsx"));
// import Home from "../pages/Home/index";
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