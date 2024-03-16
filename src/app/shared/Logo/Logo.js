import React from 'react';
import Div from "@jumbo/shared/Div";
import Link from "@mui/material/Link";
// import { ASSET_IMAGES } from "../../utils/constants/paths";

const Logo = ({ mini, mode, sx }) => {
    return (
        <Div sx={{ display: "inline-flex", ...sx }}>
            <Link href={'/admin/dashboard'}>
                {
                    !mini ?

                        <img
                            style={{ width: "60%", height: "auto", margin: "auto", display: 'flex' }}
                            src={mode === "light" ? `/images/logoDark.png` : `/images/logoDark.png`}
                            alt="Jumbo React" />
                        // <img src={'/images/callouts/camera.jpeg'} alt="Jumbo React" />
                        :
                        <img
                            style={{ width: "60%", height: "auto", margin: "auto", display: 'flex' }}
                            src={mode === "light" ? `/images/logoDark.png` : `/images/logoDark.png`}
                            alt="Jumbo React" />
                    // <img src={mode === "light" ? `${ASSET_IMAGES}/logoDark.png` : `${ASSET_IMAGES}/logoDark.png`} alt="Jumbo React" />
                }
            </Link>
        </Div>
    );
};

Logo.defaultProps = {
    mode: "light"
};

export default Logo;
