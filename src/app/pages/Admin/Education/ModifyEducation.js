import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import JumboCardQuick from '@jumbo/components/JumboCardQuick';
import { useLocation, useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { educationModifyApi } from 'app/services/Admin/education-services';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import MainCard from 'app/components/Cards/MainCard';
import PageHeaderButton from 'app/components/Button/PageHeaderButton';
import TextFieldForm from 'app/components/Inputs/Forms/TextFieldForm';
import FormButton from 'app/components/Inputs/Forms/FormButton';

const ModifyEducation = () => {
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
            values.educationId = state?.educationId
        }
        let startSplit = values.startDuration.split('-');
        let endSplit = values.endDuration.split('-');
        delete values.startDuration
        delete values.endDuration
        values.startMonth = startSplit[0]
        values.startYear = startSplit[1]
        values.endMonth = endSplit[0]
        values.endYear = endSplit[1]

        dispatch(educationModifyApi(values, (res) => {
            navigation("/admin/education")
        }))
    }

    return (
        <>
            <MainCard
                title={"Add Education"}
                button={<PageHeaderButton
                    title={'back'}
                    to={"/admin/education"} />} >
                <Formik
                    initialValues={{
                        degreeName: state?.degreeName || "",
                        board: state?.board || "",
                        institute: state?.institute || "",
                        startDuration: state !== null ? `${state?.startMonth}-${state?.startYear}` : "",
                        endDuration: state !== null ? `${state?.endMonth}-${state?.endYear}` : "",
                        state: state?.state || "",
                        city: state?.city || "",
                    }}
                    validationSchema={Yup.object().shape({
                        degreeName: Yup
                            .string()
                            .required('Degree earned is required'),
                        board: Yup
                            .string()
                            .required('Board is required'),
                        institute: Yup
                            .string()
                            .required('Institute is required'),
                        startDuration: Yup
                            .string()
                            .required('Start year is required'),
                        endDuration: Yup
                            .string()
                            .required('End year is required'),
                        state: Yup
                            .string()
                            .required('State is required'),
                        city: Yup
                            .string()
                            .required('City is required'),

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
                                            field={'degreeName'}
                                            label={'Degree Earned'}
                                            placeholder='Bachelor of Science , Master of Business' />
                                    </Grid>
                                    <Grid item xs={12} md={6}  >
                                        <TextFieldForm
                                            formik={props}
                                            field={'institute'}
                                            label={'Institute'}
                                            placeholder='college, university' />
                                    </Grid>
                                    <Grid item xs={12} md={6}  >
                                        <TextFieldForm
                                            formik={props}
                                            field={'board'}
                                            label={'Board'}
                                            placeholder='GTU' />
                                    </Grid>

                                    <Grid item xs={12} >
                                        <h3 style={{ marginBottom: "7px", marginTop: "7px" }}> Education Place</h3>
                                    </Grid>

                                    <Grid item xs={12} md={6}  >
                                        <TextFieldForm
                                            formik={props}
                                            field={'state'}
                                            label={'State'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <TextFieldForm
                                            formik={props}
                                            field={'city'}
                                            label={'City'}
                                        />
                                    </Grid>
                                    <Grid item xs={12}  >
                                        <h3 style={{ marginBottom: "7px", marginTop: "7px" }} > Education Duration </h3>
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
                                </Grid >
                                <Grid
                                    container
                                    sx={{ textAlignLast: "end", mt: 0.5 }}
                                    spacing={1.5}>
                                    <Grid item xs={12}>
                                        <FormButton type={"submit"} title={"save"} onClick={handleSubmit} />
                                        <FormButton type={"cancel"} to={"/admin/education"} />
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

export default ModifyEducation;
