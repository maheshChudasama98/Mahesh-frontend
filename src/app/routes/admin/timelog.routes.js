import React from "react";
import Page from "@jumbo/shared/Page";

import Category from "app/pages/Admin/Schedule/Category/Category";
import ModifyCategory from "app/pages/Admin/Schedule/Category/ModifyCategory";

import WorkLogs from "app/pages/Admin/Schedule/Time-log/WorkLogs";
import Diagram from "app/pages/Admin/Schedule/Diagram/Diagram";

const routes = [
    {
        path: "/admin/category",
        element: <Page component={Category} />
    },
    {
        path: "/admin/category/create",
        element: <Page component={ModifyCategory} />
    },
    {
        path: "/admin/category/edit",
        element: <Page component={ModifyCategory} />
    },
    {
        path: "/admin/timelog/",
        element: <Page component={WorkLogs} />
    },
    {
        path: "/admin/time/diagram",
        element: <Page component={Diagram} />
    },
]

export default routes;