import { ListItemButton, alpha } from '@mui/material'
import React from 'react'

const ListItemCard = ({ children }) => {
    return (
        <ListItemButton
            disableRipple
            alignItems="flex-start"
            sx={{
                cursor: 'auto',
                borderBottom: 1,
                borderBottomColor: 'divider',
                '&:hover .update-task': {
                    boxShadow: `0 3px 10px 0 ${alpha('#000', 0.2)}`,
                    cursor: 'auto',
                    borderBottomColor: 'transparent',
                    opacity: 1,
                }
            }}>
            {children}
        </ListItemButton>
    )
}

export default ListItemCard