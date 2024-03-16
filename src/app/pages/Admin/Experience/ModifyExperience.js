import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { experienceModifyApi } from 'app/services/Admin/experience-services';
import MainCard from 'app/components/Cards/MainCard';
import PageHeaderButton from 'app/components/Button/PageHeaderButton';
import TextFieldForm from 'app/components/Inputs/Forms/TextFieldForm';
import FormButton from 'app/components/Inputs/Forms/FormButton';

const ModifyExperience = () => {
    const navigation = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const state = location?.state

    const [startDuration, setStartDuration] = useState(null);
    const [endDuration, setEndDuration] = useState(null);

    useEffect(() => {
        if (state !== null) {
            const endDate = dayjs(`${state?.endYear}-${state?.endMonth}`);
            const startDate = dayjs(`${state?.startYear}-${state?.startMonth}`);
            setStartDuration(startDate);
            setEndDuration(endDate);
        }
    }, []);

    const handleDateChange = (fiend, date, setFieldValue) => {
        const month = date.$M + 1
        const year = date.$y;
        const combinedDate = `${month}-${year}`;
        if (fiend === "endDuration") {
            setEndDuration(date)
            setFieldValue("endDuration", combinedDate)
        } else if (fiend === "startDuration") {
            setStartDuration(date)
            setFieldValue("startDuration", combinedDate)
        }
    };

    const onSubmitAction = (values) => {
        if (state !== null) {
            values.experienceId = state?.experienceId
        }
        let startSplit = values.startDuration.split('-');
        let endSplit = values.endDuration.split('-');
        delete values.startDuration
        delete values.endDuration
        values.startMonth = startSplit[0]
        values.startYear = startSplit[1]
        values.endMonth = endSplit[0]
        values.endYear = endSplit[1]

        dispatch(experienceModifyApi(values, (res) => {
            navigation("/admin/experience")
        }))
    }

    return (
        <>
            <MainCard
                title={"Add Experience"}
                button={<PageHeaderButton
                    title={'back'}
                    to={'/admin/experience'} />}>
                <Formik
                    initialValues={{
                        jobTitle: state?.jobTitle || "",
                        companyName: state?.companyName || "",
                        position: state?.position || "",
                        location: state?.location || "",
                        // achievements: state?.achievements || "",
                        startDuration: state !== null ? `${state?.startMonth}-${state?.startYear}` : "",
                        endDuration: state !== null ? `${state?.endMonth}-${state?.endYear}` : "",
                        description: state?.description || "",
                    }}
                    validationSchema={Yup.object().shape({
                        jobTitle: Yup
                            .string()
                            .required('Job title is required'),
                        companyName: Yup
                            .string()
                            .required('Company name is required'),
                        position: Yup
                            .string()
                            .required('Position is required'),
                        location: Yup
                            .string()
                            .required('Location is required'),
                        // achievements: Yup
                        //     .string()
                        //     .required('Achievements is required'),
                        startDuration: Yup
                            .string()
                            .required('Start year is required'),
                        endDuration: Yup
                            .string()
                            .required('End year is required'),
                    })}
                    onSubmit={onSubmitAction}
                >
                    {(props) => {
                        const { touched, errors, setFieldValue, handleSubmit } = props;

                        return (
                            <>
                                <Grid container spacing={1.5} >
                                    <Grid item xs={12}   >
                                        <TextFieldForm
                                            formik={props}
                                            label={'Job title'}
                                            field={'jobTitle'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextFieldForm
                                            formik={props}
                                            label={'Company name'}
                                            field={'companyName'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextFieldForm
                                            formik={props}
                                            label={'Position'}
                                            field={'position'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <TextFieldForm
                                            formik={props}
                                            label={'Location'}
                                            field={'location'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <TextFieldForm
                                            formik={props}
                                            label={'Achievements'}
                                            field={'achievements'}
                                            required={false}
                                        />
                                    </Grid>

                                    <Grid item xs={12}  >
                                        <h3 style={{ marginBottom: "7px", marginTop: "7px" }} >Experience Duration </h3>
                                    </Grid>

                                    <Grid item xs={12} md={6} >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label={'Start *'}
                                                views={['month', 'year']}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        error: Boolean(errors.startDuration) && touched.startDuration,
                                                        helperText: Boolean(errors.startDuration) && touched.startDuration ? errors.startDuration : ''
                                                    },

                                                }}
                                                value={startDuration}
                                                onChange={(date) => handleDateChange("startDuration", date, setFieldValue)}
                                                maxDate={endDuration}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label={'End *'}
                                                views={['month', 'year']}
                                                value={endDuration}
                                                onChange={(date) => handleDateChange("endDuration", date, setFieldValue)}
                                                minDate={startDuration}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        error: Boolean(errors.endDuration) && touched.endDuration,
                                                        helperText: Boolean(errors.endDuration) && touched.endDuration ? errors.endDuration : ''
                                                    },

                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>

                                    <Grid item xs={12}  >
                                        <h3 style={{ marginBottom: "7px", marginTop: "7px" }} >Experience Description </h3>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextFieldForm
                                            formik={props}
                                            label={'Description'}
                                            field={'description'}
                                            required={false}
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>

                                </Grid >
                                <Grid
                                    container
                                    sx={{ textAlignLast: "end", mt: 0.5 }}
                                    spacing={1.5}>
                                    <Grid item xs={12}>
                                        <FormButton type={"submit"} title={"save"} onClick={handleSubmit} />
                                        <FormButton type={"cancel"} to={'/admin/experience'} />
                                    </Grid>
                                </Grid >
                            </>
                        );
                    }}
                </Formik >
            </MainCard>
        </>
    )
}

export default ModifyExperience;
