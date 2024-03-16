import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { companyModifyApi } from 'app/services/Admin/company-services';
import MainCard from 'app/components/Cards/MainCard';
import PageHeaderButton from 'app/components/Button/PageHeaderButton';
import TextFieldForm from 'app/components/Inputs/Forms/TextFieldForm';
import FormButton from 'app/components/Inputs/Forms/FormButton';


const ModifyCompany = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const state = location?.state

    const [startDuration, setStartDuration] = useState(null);
    const [endDuration, setEndDuration] = useState(null);

    const goBackAction = () => {
        navigation("/admin/companies")
    }

    useEffect(() => {
        if (state !== null) {
            const startDate = dayjs().set('year', Number(state.startYear));
            setStartDuration(startDate);
            if (state?.endYear) {
                const endDate = dayjs(state?.endYear);
                setEndDuration(endDate);
            }
        }
    }, []);


    const handleDateChange = (fiend, date, setFieldValue) => {
        const year = date.$y;
        if (fiend === "endDuration") {
            setEndDuration(date)
            setFieldValue("endDuration", year)
        } else if (fiend === "startDuration") {
            setStartDuration(date)
            setFieldValue("startDuration", year)
        }
    };

    const onSubmitAction = (values) => {
        if (state !== null) {
            values.companyId = state?.companyId
        }
        values.startYear = values.startDuration
        delete values.startDuration

        dispatch(companyModifyApi(values, (res) => { goBackAction() }))
    }
    return (
        <MainCard
            title={"Add Company"}
            button={<PageHeaderButton
                title={'Back'}
                to={"/admin/companies"} />}>
            <Formik
                initialValues={{
                    companyName: state?.companyName || "",
                    companySize: state?.companySize || "",
                    state: state?.state || "",
                    city: state?.city || "",
                    startDuration: state !== null ? state?.startYear : "",
                    companyEmail: state?.companyEmail || "",
                }}

                validationSchema={Yup.object().shape({
                    companyName: Yup
                        .string()
                        .required('Company Name is required'),
                    companySize: Yup
                        .string()
                        .required('Company Size is required'),
                    state: Yup
                        .string()
                        .required('State is required'),
                    city: Yup
                        .string()
                        .required('city is required'),
                    startDuration: Yup
                        .string()
                        .required('Start is required'),
                    companyEmail: Yup
                        .string()
                        .required('Email is required'),
                })}
                onSubmit={onSubmitAction}
            >
                {(props) => {
                    const { touched, errors, setFieldValue,  handleSubmit } = props;

                    return (
                        <>
                            <Grid container spacing={1.5} >
                                <Grid item xs={12}   >
                                    <TextFieldForm
                                        formik={props}
                                        label={'Company name'}
                                        field={'companyName'}
                                    />

                                </Grid>
                                <Grid item xs={12} md={6}  >
                                    <TextFieldForm
                                        formik={props}
                                        label={'Company Size'}
                                        field={'companySize'}
                                        type={'number'} />
                                </Grid>
                                <Grid item xs={12} md={6}  >
                                    <TextFieldForm
                                        formik={props}
                                        label={'Company Email'}
                                        field={'companyEmail'} />
                                </Grid>

                                <Grid item xs={12} >
                                    <h3 style={{ marginBottom: "7px", marginTop: "7px" }} >Education Place</h3>
                                </Grid>

                                <Grid item xs={12} md={6}  >
                                    <TextFieldForm
                                        formik={props}
                                        label={'State'}
                                        field={'state'} />
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextFieldForm
                                        formik={props}
                                        label={'City'}
                                        field={'city'} />
                                </Grid>
                                <Grid item xs={12}  >
                                    <h3 style={{ marginBottom: "7px", marginTop: "7px" }} >Education Duration </h3>
                                </Grid>

                                <Grid item xs={12} md={6} >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label={'Start *'}
                                            views={['year']}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    error: Boolean(errors.startDuration) && touched.startDuration,
                                                    helperText: Boolean(errors.startDuration) && touched.startDuration ? errors.startDuration : ''
                                                },

                                            }}
                                            value={startDuration}
                                            onChange={(date) => handleDateChange("startDuration", date, setFieldValue)}
                                        // maxDate={endDuration}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid >
                            <Grid
                                container
                                sx={{ textAlignLast: "end", mt: 0.5 }}
                                spacing={1.5}>
                                <Grid item xs={12}>
                                    <FormButton type={"submit"} title={"save"} onClick={handleSubmit} />
                                    <FormButton type={"cancel"} to={"/admin/companies"} />
                                </Grid>
                            </Grid >
                        </>
                    );
                }}
            </Formik >
        </MainCard >
    )
}

export default ModifyCompany;
