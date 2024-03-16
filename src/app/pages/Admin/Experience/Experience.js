import { faGraduationCap, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import JumboDdMenu from '@jumbo/components/JumboDdMenu'
import { Typography } from '@mui/material'
import Div from '@jumbo/shared/Div'
import ListCard from 'app/components/Cards/ListCard'
import { sweetAlertDelete } from 'app/config/sweetAlertsActions'
import { experienceDeleteApi, experienceFetchListApi } from 'app/services/Admin/experience-services'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MainCard from 'app/components/Cards/MainCard'
import PageHeaderButton from 'app/components/Button/PageHeaderButton'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'


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

const Experience = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch()

    const [experienceList, setExperienceList] = useState([])

    const experienceListFetchApiAction = () => {
        dispatch(experienceFetchListApi((res) => {
            setExperienceList(res)
        }))
    }

    useEffect(() => {
        experienceListFetchApiAction()
    }, [])

    const editAction = (option, state) => {
        navigation(`/admin/experience/edit`, { state })
    }

    const deleteAction = (option, item) => {
        sweetAlertDelete().then((result) => {
            if (result === 'deleted') {
                dispatch(experienceDeleteApi(item.experienceId, (res) => {
                    experienceListFetchApiAction()
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
                title={"Experience"}
                button={<PageHeaderButton
                    title={'Add'}
                    icon={<FontAwesomeIcon icon={faGraduationCap} />}
                    to={"/admin/experience/create"} />}>

                {experienceList && experienceList.length > 0 ? experienceList.map((item, key) => {
                    return (
                        <ListCard key={key} >
                            <Div sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant={"h4"} color={"primary.main"} >{item?.jobTitle}</Typography>
                                <Div>
                                    <JumboDdMenu
                                        menuItems={menuItems}
                                        item={item}
                                        icon={<MoreVertIcon fontSize='20px' />} />
                                </Div>
                            </Div>

                            <Typography variant={"h6"} color={"text.secondary"} >{item?.companyName}</Typography>
                            <Typography variant={"h6"} color={"text.secondary"} >Board-{item?.location}</Typography>

                            <Div sx={{ display: "flex", justifyContent: "space-between" }}>
                                {/* <Typography variant={"h6"} color={"text.secondary"} >{item?.state}, {item?.city} </Typography> */}
                                <Typography
                                    variant={"h6"}
                                    color={"text.secondary"} >
                                    ( {monthNames[item?.startMonth]}-{item?.startYear} to {monthNames[item?.endMonth]}-{item?.endYear} )
                                </Typography>
                            </Div>
                        </ListCard>
                    )
                }) : <NoDataPlaceholder />}
            </MainCard>
        </>
    )
}

export default Experience
