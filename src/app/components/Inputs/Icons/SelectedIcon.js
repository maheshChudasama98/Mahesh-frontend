import React, { useState } from 'react';
import ModalDialog from 'app/components/Modals/ModalDialog';
import IconArray from './IconArray';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import JumboScrollbar from '@jumbo/components/JumboScrollbar';
import Div from '@jumbo/shared/Div';
function MyComponent({ color = "primary", defaultIcon = IconArray[0]?.icon, handleIcon }) {
    const [open, setOpen] = useState(false);
    const height = useState(window.innerHeight)
    const [selectedIcon, setSelectedIcon] = useState(defaultIcon);
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const handleSelectIcon = (item) => {
        setSelectedIcon(item?.icon)
        handleIcon(item.value)
        setOpen(false)
    }

    return (
        <>
            <div onClick={handleOpen}>
                <IconButton
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                    sx={{
                        background: color,
                        width: 35,
                        height: 35
                    }}
                >
                    <FontAwesomeIcon
                        icon={selectedIcon}
                        color={"#fff"}
                        size='xs'
                    />
                </IconButton>
                <h5 style={{ margin: '10px', padding: '0', fontSize: '18px', display: 'inline' }}>
                    {'Select Icon'}
                </h5>
            </div >
            <ModalDialog
                title={"Select Icon"}
                open={open}
                handleClose={handleClose}>
                <JumboScrollbar
                    autoHeight
                    autoHeightMin={window.innerHeight - 250}
                    autoHide
                    autoHideDuration={200}
                    autoHideTimeout={500}
                >
                    <Grid container spacing={1.5}>
                        {
                            IconArray && IconArray.map((item, key) => {
                                return (
                                    <Grid item xs={2} key={key} >
                                        <Tooltip title={item?.label} arrow>
                                            <IconButton
                                                disableRipple
                                                disableFocusRipple
                                                disableTouchRipple
                                                sx={{
                                                    background: color,
                                                    width: 40,
                                                    height: 40
                                                }} onClick={() => handleSelectIcon(item)}>
                                                <FontAwesomeIcon icon={item?.icon} color={"#fff"} size='sm' />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </JumboScrollbar>
            </ModalDialog>

        </>
    );
}

export default MyComponent;
