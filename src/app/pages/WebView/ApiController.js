import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ModalDialog from 'app/components/Modals/ModalDialog'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import TextFieldForm from 'app/components/Inputs/Forms/TextFieldForm';

const ApiController = () => {
    const baseURL = localStorage.getItem('apiUrl')
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (!baseURL) {
            localStorage.setItem('apiUrl', "localhost:8000")
        }
    }, [])

    function onSubmitAction(values) {
        if (baseURL !== values?.apiURL) {
            localStorage.setItem('apiUrl', values?.apiURL)
            setOpen(false)
            window.location.reload()
        } else {
            setOpen(false)
        }
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant="outlined"
                size='small'
                sx={{ margin: 2, padding: 0, width: 200, alignSelf: "center" }} >
                <h3>Send Request</h3>
            </Button>
            {open &&
                <ModalDialog
                    title='Send Request'
                    open={open}
                    handleClose={() => setOpen(false)}>
                    <Box sx={{ minWidth: { xs: 200, sm: 500 } }}>
                        <Formik
                            initialValues={{
                                apiURL: baseURL || "",
                            }}
                            validationSchema={Yup.object().shape({
                                apiURL: Yup
                                    .string()
                                    .required('Api URL is required'),
                            })}
                            onSubmit={onSubmitAction}>
                            {(props) => {
                                return (<>
                                    <h4 style={{ margin: "0 0 20px 0", padding: 0 }}>{`http://${props?.values?.apiURL}/`}</h4>
                                    <Form noValidate >
                                        <TextFieldForm
                                            formik={props}
                                            field={'apiURL'}
                                            label={'Api URL'}
                                            placeholder='Bachelor of Science , Master of Business' />
                                        <Button
                                            onClick={props.handleSubmit}
                                            variant="contained"
                                            fullWidth
                                            sx={{ marginTop: 2, }} >
                                            save
                                        </Button>
                                    </Form>
                                </>
                                )
                            }}
                        </Formik>
                    </Box>
                </ModalDialog >
            }
        </>
    )

}

export default ApiController