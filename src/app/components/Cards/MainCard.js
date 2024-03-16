import React from "react";
import PropTypes from 'prop-types';
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div/Div";
import { useTranslation } from 'react-i18next';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
const MainCard = ({ title, tabs, subheader, children, demoCode, noWrapper, wrapperSx, sx, button, headerStyle }) => {
    const { t } = useTranslation()
    return (
        <React.Fragment>
            <Card >
                <CardHeader
                    title={
                        title && (
                            <Box sx={{
                                justifyContent: { sm: 'space-between' },
                                alignItems: 'center',
                                display: { xs: "block", sm: "flex" },
                                textAlign: { xs: "center" }
                            }}>
                                <Box sx={{ display: { xs: "block", sm: "flex" }, alignItems: "center", textAlign: "center" }}>
                                    <h3 style={{ margin: 0, padding: 0 }}>{t(title)} </h3>
                                    {tabs &&
                                        <Box sx={{ marginTop: { xs: 1, sm: 0 } }}>
                                            {tabs}
                                        </Box>
                                    }
                                </Box>
                                {button &&
                                    <Box sx={{ marginTop: { xs: 2, sm: 0 } }}>
                                        {button}
                                    </Box>
                                }
                            </Box >
                        )
                    }
                    subheader={
                        subheader && (
                            <Typography sx={{ mt: 1, color: "text.secondary" }}>{subheader}</Typography>
                        )
                    }
                    sx={{ borderBottom: "1px solid #ebebeb", ...headerStyle }}

                />

                {
                    noWrapper ? children :
                        <CardContent
                            sx={{
                                minWidth: 0,
                                ...wrapperSx,
                            }}
                        >
                            {children}
                        </CardContent>
                }
            </Card>
        </React.Fragment >
    )
};

MainCard.propTypes = {
    title: PropTypes.node,
    subheader: PropTypes.node,
    children: PropTypes.node,
    demoCodeFile: PropTypes.string,
};

export default MainCard;