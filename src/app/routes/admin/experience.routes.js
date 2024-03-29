import React from "react";
import Page from "@jumbo/shared/Page";

import Experience from "app/pages/Admin/Experience/Experience";
import ModifyExperience from "app/pages/Admin/Experience/ModifyExperience";

const routes = [
    {
        path: "/admin/experience",
        element: <Page component={Experience} />
    },
    {
        path: "/admin/experience/create",
        element: <Page component={ModifyExperience} />
    },
    {
        path: "/admin/experience/edit",
        element: <Page component={ModifyExperience} />
    },
]

export default routes;