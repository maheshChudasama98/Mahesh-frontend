import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import 'app/styles/login.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
// login api 
import { loginApiAction } from 'app/services/auth-services';
import { useDispatch } from 'react-redux';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardActions, CardContent, } from '@mui/material';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const LoginComponents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { sidebarTheme, setSidebarTheme } = useJumboSidebarTheme();
    // const { theme, setTheme } = useJumboTheme();

    useEffect(() => {
        localStorage.removeItem("user");
    }, [])

    // console.log(sidebarTheme?.palette?.nav, "@@@");

    const formik = useFormik({
        initialValues: {
            email: 'admin@gmail.com',
            password: 'Admin@1234',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
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
                    // themeColor: response.themeColor,
                }
                localStorage.setItem('user', JSON.stringify(tempObject))
                localStorage.setItem('themeColor', response.themeColor)

                // console.log(sidebarTheme?.nav);
                // setSidebarTheme({
                //     ...sidebarTheme,
                //     palette: {
                //         ...sidebarTheme?.palette,
                //         nav: {
                //             action: {
                //                 active: "#feb800",
                //                 hover: "#feb800",
                //             },
                //             background: {
                //                 active: alpha("#feb800", .15),
                //                 hover: "#E9ECEF"
                //             },
                //             tick: {
                //                 active: "#feb800",
                //                 hover: "#ADB5BD"
                //             }
                //         }
                //     }
                //     // overlay: {
                //     //     bgColor: response.themeColor,
                //     //     opacity: 0.85
                //     // },
                // })
                // let UiChanges = customSetThemeColors("#feb800", theme)

                // setTheme({
                //     ...theme,
                //     ...UiChanges
                // })
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
            {/* <div style={{ position: 'absolute', width: '100%', top: 0 }}>

                <Header />
            </div> */}

            <div className="backGround">
                <div className='box-form' >
                    <Card sx={{ maxWidth: 345, margin: 'auto', }}>
                        <CardContent>
                            <div style={{ width: "100%", textAlignLast: "center", }}>
                                <img src='/images/logoDark.png' width={120} style={{ margin: 'auto' }} alt='logo' />
                            </div>
                            <h2 style={{ textAlign: "center", margin: 0, padding: 0 }} >Login</h2>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    sx={{ my: 2 }}
                                    variant="standard"
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FontAwesomeIcon icon={faUser} size='lg' />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />

                                <TextField
                                    fullWidth
                                    sx={{ my: 2 }}
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
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FontAwesomeIcon icon={faLock} size='lg' />
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

                                <p >Forgot password?</p>
                                <div className='container'>
                                    <Button
                                        fullWidth
                                        color="primary"
                                        className='mt-2 mb-3'
                                        variant="contained"
                                        type="submit"
                                    >
                                        LOGIN
                                    </Button>
                                </div>
                            </form>
                        </CardContent>

                        <CardActions>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default LoginComponents
