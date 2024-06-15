import { lazy } from "react"
// import Loading from "../components/Loading/index";

const Home=lazy(()=>import("../pages/Home/index.tsx"));
// import Home from "../pages/Home/index";
const About=lazy(()=>import("../pages/About/index.tsx"));
const ErrorPage=lazy(()=>import("../pages/404/index.tsx"))

const routes=[
    {
        path:"/",
        element:<Home />
    },
    {
        path:"about",
        element:<About />
    },
    // {
    //     path:"loading",
    //     element:<Loading/>
    // },
    {
        path:"*",
        element:<ErrorPage />
    },
];

export default routes;