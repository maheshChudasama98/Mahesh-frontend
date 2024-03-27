import React from "react";
// import { Navigate } from "react-router-dom";
import Page from "@jumbo/shared/Page";
import WebView from "app/pages/WebView";
import UserProfile from "app/pages/User-profile";
import LoginComponents from "app/pages/Auth/Login/LoginComponents";
import SingUpComponents from "app/pages/Auth/SingUp/SingUpComponents";

import Admin from "./middleware/Admin";
import userRoutes from "app/routes/user.routes";
import companiesRoutes from "app/routes/admin/companies.routes";
import educationRoutes from "app/routes/admin/education.routes";
import experienceRoutes from "app/routes/admin/experience.routes";
import projectsRoutes from "app/routes/admin/projects.routes";
import settingRoutes from "app/routes/admin/setting.routes";
import skillsRoutes from "app/routes/admin/skills.routes";
import timelogRoutes from "app/routes/admin/timelog.routes";
import settingWalletRoutes from "app/routes/wallet/setting.routes";
const routesForPublic = [
    {
        path: "/dashboard",
        element: <Page component={WebView} layout={"solo-page"} disableSmLogin={true} />
    },
    {
        path: "/profile",
        element: <Page component={UserProfile} layout={"solo-page"} disableSmLogin={true} />
    },

];

const routesForAuthenticatedOnly = [

    {
        middleware: [
            {
                element: Admin,
                fallbackPath: "/dashboard"
            },
        ],
        routes: [{
            middleware: [
                {
                    element: Admin,
                    fallbackPath: "/dashboard"
                },
            ],
            routes: [
                ...userRoutes,
                ...companiesRoutes,
                ...educationRoutes,
                ...experienceRoutes,
                ...projectsRoutes,
                ...settingRoutes,
                ...skillsRoutes,
                ...timelogRoutes

            ]
        },
        {
            middleware: [
                {
                    element: Admin,
                    fallbackPath: "/dashboard"
                },
            ],
            routes: [
                ...settingWalletRoutes,
            ]
        }
        ]
    }
];


const routesForNotAuthenticatedOnly = [
    {
        path: "/login",
        element: <Page component={LoginComponents} layout={"solo-page"} disableSmLogin={true} />
    },
    {
        path: "/singup",
        element: <Page component={SingUpComponents} layout={"solo-page"} disableSmLogin={true} />
    },
];

const routes = [
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
    ...routesForNotAuthenticatedOnly,
];

export { routes as default, routesForPublic, routesForNotAuthenticatedOnly, routesForAuthenticatedOnly };
