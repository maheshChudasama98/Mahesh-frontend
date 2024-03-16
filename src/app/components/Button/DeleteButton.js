import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteButton = ({ onClick }) => {
    return (
        <Tooltip title={"Delete"}>
            <IconButton
                onClick={onClick}
                sx={{
                    marginX: 0.5,
                    transition: 'all 0.3s',
                    boxShadow: 1,
                    color: '#fff',
                    alignItems: "center",
                    backgroundColor: 'red',
                    '&:hover ': {
                        color: 'red',
                        backgroundColor: '#fff',
                    }
                }}>
                <DeleteIcon fontSize={"small"} />
            </IconButton>
        </Tooltip>
    )
}

export default DeleteButton