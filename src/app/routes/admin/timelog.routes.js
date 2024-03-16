import React from "react";
import Page from "@jumbo/shared/Page";

import Category from "app/pages/Admin/Schedule/Category/Category";
import ModifyCategory from "app/pages/Admin/Schedule/Category/ModifyCategory";

import WorkLogs from "app/pages/Admin/Schedule/Time-log/WorkLogs";

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
]

export default routes;