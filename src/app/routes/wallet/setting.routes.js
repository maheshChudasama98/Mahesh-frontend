import React from "react";
import Page from "@jumbo/shared/Page";

import Setting from "app/pages/Wallet/Setting";


const routes = [
    {
        path: "/admin/wallet/setting",
        element: <Page component={Setting} />
    },
]

export default routes;