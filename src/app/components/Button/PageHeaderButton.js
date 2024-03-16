import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageHeaderButton = ({ title, icon = <ArrowBackIcon />, onClick, sx, to, state }) => {
    const { t } = useTranslation()
    const themeColor = localStorage.getItem('ThemeColor');

    const boxStyle = {
        borderRadius: "25px",
        marginBottom: "5px",
        background: themeColor,
        textTransform: 'initial',
        '& .css-wnp9wd-MuiButtonBase-root-MuiButton-root :hover': {
            backgroundColor: themeColor,
        },
        '&:hover': {
            backgroundColor: themeColor,
        },
        '&:after': {},
        ...sx,
    };

    return (
        <Link to={to} state={state}>
            <Button variant="contained" size="small" startIcon={icon} onClick={onClick}>
                {t(title)}
            </Button>
        </Link>
    )
}

export default PageHeaderButton;
