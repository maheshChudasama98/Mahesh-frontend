import React, { useRef } from 'react'
import { Avatar, Badge, FormHelperText, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { lightenColor } from 'app/config/colorChange';
import { ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';

const ImageForm = ({ formik, field, imageReturn, heightWidth = 180 }) => {
    const { t } = useTranslation()
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const themeColor = localStorage.getItem("ThemeColor")
    const lightColor = lightenColor(themeColor, 0.9)
    return (
        <div style={{ textAlign: "center" }}>
            <input
                type="file"
                ref={fileInputRef}
                id={field}
                name={field}
                accept="image/png, image/jpeg"
                style={{ display: 'none' }}
                onChange={(event) => {
                    imageReturn(event.target.files[0]);
                    formik.handleChange(event);
                    formik.setFieldValue(field, URL.createObjectURL(event.target.files[0]))
                }}
            />

            <Badge style={{ position: 'relative' }}>
                <Avatar sx={{
                    width: heightWidth, height: heightWidth,
                    background: lightColor,
                    border: formik.errors[field] ? '1px solid red' : '2px solid transparent',

                }} src={formik?.values[field]} onClick={handleButtonClick} >
                    <ImageRoundedIcon sx={{ width: 100, height: 100, color: formik.errors[field] ? "red" : themeColor }} />
                </Avatar>
                <IconButton color="info" onClick={handleButtonClick} style={{ position: 'absolute', top: '150px', right: '-10px' }}>
                    <CameraAltIcon />
                </IconButton>
            </Badge>
            <ErrorMessage name={field}>
                {(msg) => <FormHelperText style={{ textAlign: "center" }} error>{t(msg)}</FormHelperText>}
            </ErrorMessage>
        </div>
    )
}

export default ImageForm