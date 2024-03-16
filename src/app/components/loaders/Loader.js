import React from 'react'
import 'app/styles/loader.css'
import { Backdrop } from '@mui/material'
const Loader = () => {
    return (
        <>
            <Backdrop
                sx={{ background: '#ffffffc5', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                <div className="spinner">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>

            </Backdrop>
        </>
    )
}

export default Loader
