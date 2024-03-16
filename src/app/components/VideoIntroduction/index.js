import React from 'react';
import { Box, Typography } from '@mui/material';

const Index = () => {
    const videoContainerStyle = {
        width: '100%',
        height: '550px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: -10,
    };

    const videoStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    };

    return (
        <>

            <div style={{ position: 'relative', background: 'rgba(0, 0, 0, 0.7)', width: '100%' }}>
                <Box sx={{ color: '#fff', position: 'absolute', top: '40%', width: '-webkit-fill-available' }}>
                    <Typography sx={{ fontSize: '60px', textAlign: 'center', margin: '0px', color: '#fff' }}>
                        <img src="/images/logoLight.png" alt="Logo" />

                    </Typography>
                </Box>

                <div style={videoContainerStyle}>
                    <video autoPlay loop muted playsInline style={videoStyle}>
                        <source src="/videos/bg3.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

        </>
    );
};

export default Index;
