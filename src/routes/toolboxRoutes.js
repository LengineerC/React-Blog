import { lazy } from "react";

const ToolMenu=lazy(()=>import("@/pages/Toolbox/ToolMenu/index.tsx"));
const Unicode=lazy(()=>import("@/components/Unicode/index.tsx"));

const toolboxRoutes=[
    {
        path:"menu",
        element: <ToolMenu />
    },
    {
        path:"unicode",
        element: <Unicode />
    },
];

export default toolboxRoutes;