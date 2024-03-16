import { faGraduationCap, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import JumboDdMenu from '@jumbo/components/JumboDdMenu'
// import JumboScrollbar from '@jumbo/components/JumboScrollbar'
import { Typography, } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { educationDeleteApi, educationFetchListApi } from 'app/services/Admin/education-services'
import { useEffect } from 'react'
import ListCard from 'app/components/Cards/ListCard'
import Div from '@jumbo/shared/Div'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { sweetAlertDelete } from 'app/config/sweetAlertsActions';
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import MainCard from 'app/components/Cards/MainCard'
import PageHeaderButton from 'app/components/Button/PageHeaderButton'

const monthNames = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];
const Education = () => {
    const dispatch = useDispatch()
    const navigation = useNavigate()


    const [educationList, setEducationList] = useState([])

    // const educationAddAction = () => {
    //     navigation("/admin/education/create")
    // }

    const educationListFetchApiAction = () => {
        dispatch(educationFetchListApi((res) => {
            setEducationList(res)
        }))
    }

    useEffect(() => {
        educationListFetchApiAction()
    }, [])

    const editAction = (option, state) => {
        navigation(`/admin/education/edit`, { state })
    }

    const deleteAction = (option, item) => {
        sweetAlertDelete().then((result) => {
            if (result === 'deleted') {
                dispatch(educationDeleteApi(item.educationId, (res) => {
                    educationListFetchApiAction()
                }))
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    var menuItems = [
        {
            id: 1,
            icon: <FontAwesomeIcon icon={faPenToSquare} color='green' />,
            title: "Edit",
            slug: "eidt",
            onClickCallback: editAction
        },
        {
            id: 2,
            icon: <FontAwesomeIcon icon={faTrash} color='red' />,
            title: "Delete",
            slug: "delete",
            onClickCallback: deleteAction
        }
    ];
    return (
        <>
            <MainCard
                title={"Education"}
                button={<PageHeaderButton
                    title={'Add'}
                    icon={<FontAwesomeIcon icon={faGraduationCap} />}
                    to={"/admin/education/create"} />} >

                {
                    educationList && educationList.length > 0 ? educationList.map((item, key) => {
                        return (
                            <ListCard key={key} >
                                <Div sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant={"h4"} color={"primary.main"} >{item?.degreeName}</Typography>
                                    <Div>
                                        <JumboDdMenu
                                            menuItems={menuItems}
                                            item={item}
                                            icon={<MoreVertIcon fontSize='20px' />} />

                                    </Div>
                                </Div>
                                <Typography variant={"h6"} color={"text.secondary"} >{item?.institute}</Typography>
                                <Typography variant={"h6"} color={"text.secondary"} >Board-{item?.board}</Typography>

                                <Div sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant={"h6"} color={"text.secondary"} >{item?.state}, {item?.city} </Typography>
                                    <Typography
                                        variant={"h6"}
                                        color={"text.secondary"} >
                                        ( {monthNames[item?.startMonth]}-{item?.startYear} to {monthNames[item?.endMonth]}-{item?.endYear} )
                                    </Typography>
                                </Div>
                            </ListCard>
                        )
                    }) :
                        <NoDataPlaceholder />
                }
            </MainCard>
        </>
    )
}

export default Education
