import { lazy } from "react"
import { Navigate } from "react-router-dom";

const Home=lazy(()=>import("../pages/Home/index.tsx"));
const About=lazy(()=>import("../pages/About/index.tsx"));

const routes=[
    {
        path:"/",
        element:<Home />
    },
    {
        path:"about",
        element:<About />
    },
    {
        path:"*",
        element:<Navigate to="/"/>
    },
];

export default routes;