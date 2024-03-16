import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { skillModifyApi } from 'app/services/Admin/skills-services';
import PageHeaderButton from 'app/components/Button/PageHeaderButton';
import MainCard from 'app/components/Cards/MainCard';
import TextFieldForm from 'app/components/Inputs/Forms/TextFieldForm';
import FormButton from 'app/components/Inputs/Forms/FormButton';

const ModifyTechnicalSkills = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const state = location?.state


    const onSubmitAction = (values) => {
        if (state !== null) {
            values.skillId = state?.skillId
        }
        values.skillType = "Technical"
        dispatch(skillModifyApi(values, () => { navigation("/admin/skills", { state: { tabValue: 0 } }) }))
    }

    return (
        <MainCard
            title={"Add Technical skill"}
            button={<PageHeaderButton
                title={'Back'}
                state={{ tabValue: 0 }}
                to={"/admin/skills"} />}>
            <Formik
                initialValues={{
                    skillName: state?.skillName || "",
                }}

                validationSchema={Yup.object().shape({
                    skillName: Yup
                        .string()
                        .required('Technical skill is required'),
                })}
                onSubmit={onSubmitAction}>
                {(props) => {
                    const { handleSubmit } = props;

                    return (
                        <>
                            <Grid container spacing={1.5} >
                                <Grid item xs={12}   >
                                    <TextFieldForm
                                        formik={props}
                                        label={'Technical skill'}
                                        field={'skillName'}
                                    />
                                </Grid>

                            </Grid >
                            <Grid
                                container
                                sx={{ textAlignLast: "end", mt: 0.5 }}
                                spacing={1.5}>
                                <Grid item xs={12}>
                                    <FormButton type={"submit"} title={"save"} onClick={handleSubmit} />
                                    <FormButton type={"cancel"} to={"/admin/skills/technical"} />
                                </Grid>
                            </Grid >
                        </>
                    );
                }}
            </Formik >
        </MainCard >
    )
}

export default ModifyTechnicalSkills
