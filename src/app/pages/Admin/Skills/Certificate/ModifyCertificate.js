import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
// import { companyModifyApi } from 'app/services/Admin/company-services';
import { skillModifyApi } from 'app/services/Admin/skills-services';
import MainCard from 'app/components/Cards/MainCard';
import PageHeaderButton from 'app/components/Button/PageHeaderButton';
import TextFieldForm from 'app/components/Inputs/Forms/TextFieldForm';
import FormButton from 'app/components/Inputs/Forms/FormButton';

const ModifyCertificate = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const state = location?.state
    const onSubmitAction = (values) => {
        if (state !== null) {
            values.skillId = state?.skillId
        }
        values.skillType = "Certificate"
        dispatch(skillModifyApi(values, (res) => { navigation("/admin/skills", { state: { tabValue: 1 } }) }))
    }

    return (
        <MainCard
            title={"Add certificate"}
            button={<PageHeaderButton
                title={'Back'}
                state={{ tabValue: 1 }}
                to={"/admin/skills"} />}>
            <Formik Formik
                initialValues={{
                    skillName: state?.skillName || "",
                }}

                validationSchema={Yup.object().shape({
                    skillName: Yup
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
                                <Grid item xs={12}   >
                                    <TextFieldForm
                                        formik={props}
                                        label={'Certificate name'}
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
                                    <FormButton type={"cancel"} to={"/admin/skills/certificate"} />
                                </Grid>
                            </Grid >
                        </>
                    );
                }}
            </Formik >
        </MainCard >
    )
}

export default ModifyCertificate
