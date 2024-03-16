import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { categoryDeleteApi, categoryFetchListApi } from 'app/services/Admin/timelog-services'
import { sweetAlertDelete } from 'app/config/sweetAlertsActions'
import MainCard from 'app/components/Cards/MainCard'
import PageHeaderButton from 'app/components/Button/PageHeaderButton'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconArray from 'app/components/Inputs/Icons/IconArray';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'

const Category = () => {
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const [categoryList, setCategoryList] = useState([])
    const [height, setHeight] = useState(window.innerHeight)

    const categoryFetchApiAction = () => {
        dispatch(categoryFetchListApi((res) => {
            setCategoryList(res)
        }))
    }

    useEffect(() => {
        categoryFetchApiAction()
    }, [])

    const editAction = (state) => navigation(`/admin/category/edit`, { state })
    const deleteAction = (item) => {
        sweetAlertDelete().then((result) => {
            if (result === 'deleted') {
                dispatch(categoryDeleteApi(item.categoryId, (res) => {
                    categoryFetchApiAction()
                }))
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <MainCard
            title={"Category"}
            button={<PageHeaderButton title={"Add Category"} to={"/admin/category/create"} icon={<FontAwesomeIcon icon={faLayerGroup} />} />}>
            {
                categoryList && categoryList.length > 0 ? categoryList.map((item, key) => {
                    return (
                        <>
                            <Grid container spacing={2}
                                sx={{
                                    borderBottom: categoryList.length > key + 1 ? '1px solid' : '0px solid',
                                    borderBottomColor: 'divider',
                                    padding: 1

                                }}>
                                <Grid item xs={10} sx={{ display: "flex", alignItems: "center", alignSelf: "center" }}>
                                    <IconButton
                                        sx={{
                                            background: item?.categoryColor,
                                            width: 35,
                                            height: 35
                                        }}
                                        disableRipple
                                        disableFocusRipple
                                        disableTouchRipple
                                        onClick={() => editAction(item)} >
                                        <FontAwesomeIcon
                                            icon={(IconArray.filter((icon) => icon.value == item?.categoryIcon))[0]?.icon || IconArray[0]?.icon}
                                            color={"#fff"}
                                            size='xs'
                                        />
                                    </IconButton>

                                    <Typography variant={"h5"} sx={{ marginLeft: 3, alignItems: "center", fontWeight: 600, fontSize: '15px', alignSelf: "center" }} >
                                        {item?.categoryName}
                                        <Typography variant={"h6"} color="text.secondary" sx={{ margin: 0, marginTop: 0.2, padding: 0, fontSize: '11px' }} >
                                            {new Date(item?.updatedAt).toISOString().split('T')[0].split('-').reverse().join('/')}
                                        </Typography>
                                    </Typography>
                                </Grid>

                                <Grid item xs={2} sx={{ textAlignLast: "end", alignSelf: "center" }}>
                                    <IconButton onClick={() => editAction(item)} size='small' >
                                        <EditIcon fontSize='small' sx={{ color: "green" }} />
                                    </IconButton>

                                    <IconButton onClick={() => deleteAction(item)} size='small'>
                                        <DeleteIcon fontSize="small" sx={{ color: "red" }} />
                                    </IconButton>
                                </Grid>
                            </Grid >
                        </>
                    )
                }) : <NoDataPlaceholder />
            }
        </MainCard >
    )
}
export default Category