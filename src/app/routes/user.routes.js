import React from "react";
import Page from "@jumbo/shared/Page";

import Dashboard from "app/pages/Admin/Dashboard/Dashboard";
import Profile from "app/pages/Admin/Profile/Profile";

const routes = [
    {
        path: "/admin/dashboard",
        element: <Page component={Dashboard} />
    },
    {
        path: "/admin/profile",
        element: <Page component={Profile} />
    },
]

export default routes;