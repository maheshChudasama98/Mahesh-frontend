import React from "react";
import Page from "@jumbo/shared/Page";

import Skills from "app/pages/Admin/Skills";
import TechnicalSkills from "app/pages/Admin/Skills/TechnicalSkills/TechnicalSkills";
import ModifyTechnicalSkills from "app/pages/Admin/Skills/TechnicalSkills/ModifyTechnicalSkills";

import SoftSkills from "app/pages/Admin/Skills/SoftSkills/SoftSkills";
import ModifySoftSkills from "app/pages/Admin/Skills/SoftSkills/ModifySoftSkills";

import Languages from "app/pages/Admin/Skills/Languages/Languages";
import ModifyLanguage from "app/pages/Admin/Skills/Languages/ModifyLanguage";

import Certificate from "app/pages/Admin/Skills/Certificate/Certificate";
import ModifyCertificate from "app/pages/Admin/Skills/Certificate/ModifyCertificate";


const routes = [
    {
        path: "/admin/skills",
        element: <Page component={Skills} />
    },
    {
        path: "/admin/skills/technical",
        element: <Page component={TechnicalSkills} />
    },
    {
        path: "/admin/skills/technical/create",
        element: <Page component={ModifyTechnicalSkills} />
    },
    {
        path: "/admin/skills/technical/edit",
        element: <Page component={ModifyTechnicalSkills} />
    },
    {
        path: "/admin/skills/soft",
        element: <Page component={SoftSkills} />
    },
    {
        path: "/admin/skills/soft/create",
        element: <Page component={ModifySoftSkills} />
    },
    {
        path: "/admin/skills/soft/edit",
        element: <Page component={ModifySoftSkills} />
    },
    {
        path: "/admin/skills/languages",
        element: <Page component={Languages} />
    },
    {
        path: "/admin/skills/language/create",
        element: <Page component={ModifyLanguage} />
    },
    {
        path: "/admin/skills/language/edit",
        element: <Page component={ModifyLanguage} />
    },
    {
        path: "/admin/skills/certificate",
        element: <Page component={Certificate} />
    },
    {
        path: "/admin/skills/certificate/create",
        element: <Page component={ModifyCertificate} />
    },
    {
        path: "/admin/skills/certificate/edit",
        element: <Page component={ModifyCertificate} />
    },

]

export default routes;