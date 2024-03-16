import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

const EditButton = ({ onClick }) => {
    return (
        <Tooltip title={"Edit"}>
            <IconButton
                size='samll'
                onClick={onClick}
                sx={{
                    marginX: 0.5,
                    transition: 'all 0.3s',
                    boxShadow: 1,
                    color: '#fff',
                    alignItems: "center",
                    backgroundColor: 'green',
                    '&:hover ': {
                        color: 'green',
                        backgroundColor: '#fff',
                    }
                }}>
                <EditIcon fontSize={"small"} />
            </IconButton>
        </Tooltip>
    )
}

export default EditButton