import React from "react";
import AutoAwesomeMosaicRoundedIcon from '@mui/icons-material/AutoAwesomeMosaicRounded';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faBarsProgress, faBuilding, faGear, faHourglassHalf, faSackDollar, faUser, faUserGraduate } from "@fortawesome/free-solid-svg-icons";

let menus = [
    {
        role: ["SuperAdmin", "Admin"],
        label: 'Dashboard',
        type: "nav-item",
        uri: "/admin/dashboard",
        icon: <AutoAwesomeMosaicRoundedIcon sx={{ fontSize: 20 }} />
    },
    {
        role: ["SuperAdmin", "Admin", "User"],
        label: 'Schedule',
        type: "collapsible",
        icon: <FontAwesomeIcon icon={faHourglassHalf} style={{ fontSize: 17 }} />,
        children: [
            {
                uri: "/admin/timelog",
                label: 'Work logs',
                type: "nav-item",
            },
            {
                uri: "/admin/time/diagram",
                label: 'Diagram',
                type: "nav-item",
            },
            {
                uri: "/admin/category",
                label: 'Category',
                type: "nav-item",
            },
        ]
    },
    {
        role: ["SuperAdmin", "Admin", "User"],
        label: 'Wallet',
        type: "collapsible",
        uri: "/admin/wallet",
        icon: <FontAwesomeIcon icon={faSackDollar} style={{ fontSize: 17 }} />,
        children: [
            {
                uri: "/admin/wallet",
                label: 'Dashboard',
                type: "nav-item",
            },
            {
                uri: "/admin/wallet/party",
                label: 'Counterparty',
                type: "nav-item",
            },
            {
                uri: "/admin/wallet/setting",
                label: 'Setting',
                type: "nav-item",
            },
        ]
    },
    {
        role: ["SuperAdmin", "Admin", "User"],
        label: 'Education',
        type: "collapsible",
        uri: "/admin/education",
        icon: <FontAwesomeIcon icon={faUserGraduate} style={{ fontSize: 17 }} />,
        children: [{
            role: ["SuperAdmin", "Admin", "User"],
            label: 'Education',
            type: "nav-item",
            uri: "/admin/education",
            icon: <FontAwesomeIcon icon={faUserGraduate} style={{ fontSize: 17 }} />
        },
        {
            role: ["SuperAdmin", "Admin", "User"],
            label: 'Experience',
            type: "nav-item",
            uri: "/admin/experience",
            icon: <FontAwesomeIcon icon={faAward} style={{ fontSize: 17 }} />
        },
        {
            role: ["SuperAdmin", "Admin", "User"],
            label: 'Projects',
            type: "nav-item",
            uri: "/admin/projects",
            icon: <FontAwesomeIcon icon={faBarsProgress} style={{ fontSize: 17 }} />
        },
        {
            role: ["SuperAdmin", "Admin", "User"],
            label: 'Skills',
            type: "nav-item",
            uri: "/admin/skills",
            icon: <FontAwesomeIcon icon={faBarsProgress} style={{ fontSize: 17 }} />
        },
        ]
    },

    {
        role: ["SuperAdmin", "Admin", "User"],
        label: 'Profile',
        type: "nav-item",
        uri: "/admin/profile",
        icon: <FontAwesomeIcon icon={faUser} style={{ fontSize: 17 }} />
    },
    {
        role: ["SuperAdmin", "Admin", "User"],
        label: 'Company',
        type: "nav-item",
        uri: "/admin/companies",
        icon: <FontAwesomeIcon icon={faBuilding} style={{ fontSize: 17 }} />
    },
    {
        role: ["SuperAdmin", "Admin", "User"],
        label: 'Profile Setting',
        type: "nav-item",
        uri: "/admin/setting",
        icon: <FontAwesomeIcon icon={faGear} style={{ fontSize: 17 }} />
    },
]


export default menus;
