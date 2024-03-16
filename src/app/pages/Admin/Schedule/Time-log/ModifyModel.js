import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import Div from '@jumbo/shared/Div';
import { useDispatch } from 'react-redux';
import { timeLogModifyApi, timelogDeleteApi } from 'app/services/Admin/timelog-services';
import { Grid, Typography, } from '@mui/material';
import DateAndTime from 'app/components/Inputs/Forms/DateAndTime';
import TextFieldForm from 'app/components/Inputs/Forms/TextFieldForm';
import AutoCompleteSelectMenu from 'app/components/Inputs/Forms/AutoCompleteSelectMenu';
import ModalDialog from 'app/components/Modals/ModalDialog';
import { sweetAlertDelete } from 'app/config/sweetAlertsActions';
import FormButton from 'app/components/Inputs/Forms/FormButton';

const ModifyModel = ({ open, list, handleClose, defaultData, fetchApiAction }) => {
    const dispatch = useDispatch()
    const [startTime, setStartTime] = useState(dayjs(defaultData?.startTime) || dayjs(new Date()));
    const [endTime, setEndTime] = useState(dayjs(defaultData?.endTime) || dayjs(new Date()));
    const [timeDifference, setTimeDifference] = useState(defaultData?.totalTime || "00:00");

    const onSubmitAction = (values) => {
        if (defaultData?.timelogId)
            values.timelogId = defaultData?.timelogId
        values.startTime = startTime
        values.endTime = endTime

        const timeDifferenceMs = new Date(endTime) - new Date(startTime);
        const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));

        values.totalTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        dispatch(timeLogModifyApi(values, (res) => {
            handleClose()
            fetchApiAction()
        }))
    }

    const handleTimeChange = (newTimeString, type) => {
        let timeDifferenceMs = ''
        if (type === "start") {
            setStartTime(dayjs(newTimeString))
            timeDifferenceMs = new Date(endTime) - new Date(newTimeString);
        } else if (type === "end") {
            setEndTime(dayjs(newTimeString))
            timeDifferenceMs = new Date(newTimeString) - new Date(startTime);
        }
        const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
        setTimeDifference(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)
    };

    const handleClick = () => {
        sweetAlertDelete().then((result) => {
            if (result === 'deleted') {
                dispatch(timelogDeleteApi(defaultData.timelogId, (res) => {
                    handleClose()
                    fetchApiAction()
                }))
            }
        }).catch((error) => {
            console.error(error);
        });
    };
    return (

        <ModalDialog open={open} handleClose={handleClose} title={`Time log`}>
            <Div style={{ maxWidth: 500 }}>
                <Formik
                    initialValues={{
                        categoryId: defaultData?.categoryId || "",
                        details: defaultData?.details || "",
                    }}

                    validationSchema={Yup.object().shape({
                        categoryId: Yup
                            .string()
                            .required('Certificate name is required'),
                    })}
                    onSubmit={onSubmitAction}
                >
                    {(props) => {
                        const { handleSubmit } = props;

                        return (
                            <>
                                <Grid container spacing={1.5} >
                                    <Grid item xs={12} md={12}>
                                        {
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "baseline"
                                            }}>
                                                Total time {timeDifference}
                                                {defaultData?.timelogId &&
                                                    <Typography variant='h5'>
                                                        <Button
                                                            onClick={() => handleClick("delete")}
                                                            size='small'
                                                            variant="contained"
                                                            color="error">
                                                            Delete
                                                        </Button>
                                                    </Typography>
                                                }
                                            </div>
                                        }
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <DateAndTime
                                            label={'Start time *'}
                                            defaultValue={startTime}
                                            maxDate={endTime}
                                            callBackAction={(event) => { handleTimeChange(event, "start") }} />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <DateAndTime
                                            label={'End time *'}
                                            defaultValue={endTime}
                                            minDate={startTime}
                                            callBackAction={(event) => { handleTimeChange(event, "end") }} />
                                    </Grid>
                                    <Grid item xs={12} >

                                        <AutoCompleteSelectMenu
                                            formik={props}
                                            label={"Category"}
                                            field={"categoryId"}
                                            menuList={list}
                                            valueKey={'categoryId'}
                                            labelKey={'categoryName'}
                                        />
                                        {/* <FormControl fullWidth >
                                            <TextField
                                                select
                                                fullWidth
                                                labelId="categoryId"
                                                label="Category "
                                                id="categoryId"
                                                name="categoryId"
                                                required
                                                onBlur={handleBlur}
                                                value={values.categoryId}
                                                onChange={handleChange}
                                                error={touched.categoryId && Boolean(errors.categoryId)}
                                                helperText={touched.categoryId && errors.categoryId}
                                            >
                                                {
                                                    list && list.length > 0 ? list.map((item, key) => (
                                                        <MenuItem key={key} value={`${item?.categoryId || ''}`} >
                                                            <Grid container spacing={2} >
                                                                <Grid item xs={10} md={11}>
                                                                    {item?.categoryName}
                                                                </Grid>
                                                                <Grid item xs={2} md={1}>
                                                                    <FontAwesomeIcon
                                                                        icon={(IconArray.filter((icon) => icon.value == item?.categoryIcon))[0]?.icon || IconArray[0]?.icon}
                                                                        color={item?.categoryColor}
                                                                        size='xl'
                                                                        style={{ marginRight: 20 }}
                                                                    />
                                                                </Grid>

                                                            </Grid>

                                                        </MenuItem>
                                                    )) :
                                                        <MenuItem disabled >
                                                            {"Not Data found!"}
                                                        </MenuItem>
                                                }
                                            </TextField>
                                        </FormControl> */}
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextFieldForm
                                            formik={props}
                                            field='details'
                                            label='Details'
                                            required={false}
                                            multiline
                                            rows={3}
                                            maxRows={3}
                                        />

                                    </Grid>
                                </Grid >

                                <Grid
                                    container
                                    sx={{ textAlignLast: "end", mt: 0.5 }}
                                    spacing={1.5}>
                                    <Grid item xs={12}>
                                        <FormButton type={"submit"} title={"save"} onClick={handleSubmit} />
                                        <FormButton type={"cancel"} onClick={handleClose} />
                                    </Grid>
                                </Grid >
                            </>
                        );
                    }}
                </Formik >
            </Div>
        </ModalDialog >

    )
}

export default ModifyModel
