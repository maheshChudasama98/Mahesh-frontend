import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import 'app/styles/login.css'

// Material  
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

// formik
import * as yup from 'yup';
import { useFormik } from 'formik';

// login api 
import { loginApiAction } from 'app/services/auth-services';
import { useDispatch } from 'react-redux';
import { Card, CardContent, } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useJumboTheme } from '@jumbo/hooks';

const validationSchema = yup.object({
    fullName: yup
        .string()
        .required('Full name is required'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const SingUpComponents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useJumboTheme();

    useEffect(() => {
        // localStorage.clear();
        localStorage.removeItem("user");
    }, [])

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
                fullName: values.fullName,
                email: values.email,
                password: values.password,
            }

            dispatch(loginApiAction(data, (response) => {
                let tempObject = {
                    id: response.userId,
                    user: response.role,
                    role: response.roleId,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email,
                    mobile: response.mobile,
                }
                localStorage.setItem('user', JSON.stringify(tempObject))
                localStorage.setItem('themeColor', response.themeColor)
                navigate('/admin/dashboard')
            }))
        },
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div className="backGround">
                <div className=' box-form'>
                    <Card sx={{ maxWidth: 345, margin: 'auto', }}>
                        <CardContent>
                            <div style={{
                                textAlign: "center",
                                fontSize: "50px",

                            }}>
                                <FontAwesomeIcon style={{ margin: 0 }} icon={faUser} />
                            </div>
                            <h2 style={{ textAlign: "center", margin: 0, padding: 0 }} >Sing up</h2>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    sx={{ mb: 2 }}
                                    variant="standard"
                                    fullWidth
                                    id="fullName"
                                    name="fullName"
                                    label="Full name"
                                    size="small"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
                                />
                                <TextField
                                    sx={{ mb: 1 }}
                                    variant="standard"
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    size="small"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />

                                <TextField
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOutlinedIcon fontSize="small" /> : <VisibilityOffOutlinedIcon fontSize="small" />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    id="outlined-adornment-password"
                                    name="password"
                                    label="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />

                                <Button
                                    // sx={{ my: 1.5 }}
                                    fullWidth
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    Sing up
                                </Button>
                            </form>
                            <h3 style={{ textAlign: "center" }}>I'm already a member!
                                <span onClick={() => navigate('/login')} style={{ color: theme.theme.palette.primary.main }}> Sing in
                                </span>
                            </h3>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default SingUpComponents
