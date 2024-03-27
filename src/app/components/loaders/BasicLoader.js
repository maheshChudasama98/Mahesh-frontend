import React from 'react'
import 'app/styles/loader.css'
import { Backdrop } from '@mui/material'
const BasicLoader = () => {
    return (
        <>
            <div style={{ display: 'ruby-text' }}>
                <div className="spinner">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        </>
    )
}

export default BasicLoader
