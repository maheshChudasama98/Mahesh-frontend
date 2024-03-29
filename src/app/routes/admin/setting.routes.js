import React from "react";
import Page from "@jumbo/shared/Page";

import Setting from "app/pages/Admin/Setting/Setting";

const routes = [
    {
        path: "/admin/setting",
        element: <Page component={Setting} />
    },
]

export default routes;