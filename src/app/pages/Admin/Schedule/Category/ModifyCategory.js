import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { categoryModifyApi } from 'app/services/Admin/timelog-services';
import { ColorPicker } from 'app/components/Inputs/Forms/ColorPicker';
import SelectedIcon from 'app/components/Inputs/Icons/SelectedIcon';
import MainCard from 'app/components/Cards/MainCard';
import PageHeaderButton from 'app/components/Button/PageHeaderButton';
import TextFieldForm from 'app/components/Inputs/Forms/TextFieldForm';
import FormButton from 'app/components/Inputs/Forms/FormButton';
import IconArray from 'app/components/Inputs/Icons/IconArray';

const ModifyCategory = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const state = location?.state

    const [selectedColor, setSelectedColor] = useState(state?.categoryColor || '#BA68C8');
    const [selectedIcon, setSelectedIcon] = useState(state?.categoryIcon);

    const defaultIcon = (IconArray.filter((item) => item.value == state?.categoryIcon))[0]?.icon || IconArray[0]?.icon;

    const onSubmitAction = (values) => {
        values.categoryName = values.categoryName.trim();
        values.categoryColor = selectedColor
        values.categoryIcon = selectedIcon
        if (state !== null) {
            values.categoryId = state?.categoryId
        }
        dispatch(categoryModifyApi(values, (res) => { navigation("/admin/category") }))
    }

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };
    const handleIcon = (icon) => {
        setSelectedIcon(icon);
    };

    return (
        <MainCard
            title={"Add Category"}
            button={
                <PageHeaderButton title={"Back"} to={"/admin/category"} />
            }
        >
            <Formik
                initialValues={{
                    categoryName: state?.categoryName || "",
                }}
                validationSchema={Yup.object().shape({
                    categoryName: Yup
                        .string()
                        .required('Category name is required'),
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
                                        field={"categoryName"}
                                        label={"Category"}
                                        palaceHolder="Wake-up"
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <ColorPicker defaultColor={selectedColor} handleColor={handleColorChange} />
                                </Grid>
                                <Grid item xs={6} >
                                    <SelectedIcon color={selectedColor} handleIcon={handleIcon} defaultIcon={defaultIcon} />
                                </Grid>

                            </Grid >
                            <Grid sx={{ textAlignLast: "end", mt: 0.5 }} spacing={1.5}>
                                <FormButton type={"submit"} title={"save"} onClick={handleSubmit} />
                                <FormButton type={"cancel"} to={"/admin/category"} />
                            </Grid >
                        </>
                    );
                }}
            </Formik >
        </MainCard>
    )
}

export default ModifyCategory
