import { Box } from '@mui/material'
import MainCard from 'app/components/Cards/MainCard'
import React from 'react'

const Category = () => {
    return (
        <Box>
            <Box sx={{ borderBottom: "1px solid #ebebeb", marginX: 2, padding: 1 }}>
                <h2 style={{ margin: 0, padding: 0 }}>Sub Category</h2>
            </Box>
            <Box sx={{ borderBottom: "1px solid #ebebeb", marginX: 2, padding: 1 }}>
            </Box>
        </Box>
    )
}

export default Category