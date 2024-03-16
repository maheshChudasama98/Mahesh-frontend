import React from 'react'
import styled from "@mui/material/styles/styled";
import { lightenColor } from 'app/config/colorChange';
import { LinearProgress } from '@mui/material';

const Linear = ({ value, color }) => {
    const StyledLinearProgress = styled(LinearProgress)(({ colorValue, backgroundColor }) => ({
        '& .MuiLinearProgress-bar': {
            backgroundColor: colorValue,
        },
        '&.MuiLinearProgress-root': {
            backgroundColor: backgroundColor || 'transparent',
        },
        height: 6,
        borderRadius: 5,
        flex: 1,
    }));
    return (
        <StyledLinearProgress
            variant="determinate"
            value={value}
            colorValue={color}
            backgroundColor={lightenColor(color, 0.7) || "#eee"}
        />
    )
}

export default Linear