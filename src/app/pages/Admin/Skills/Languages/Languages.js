import React, { useEffect, useState } from 'react'
import { ListItemText, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { skillDeleteApi, skillsFetchListApi } from 'app/services/Admin/skills-services'
import { sweetAlertDelete } from 'app/config/sweetAlertsActions'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import ListItemCard from 'app/components/Cards/ListItemCard'
import EditButton from 'app/components/Button/EditButton'
import DeleteButton from 'app/components/Button/DeleteButton'

const Languages = () => {
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const [skillList, setSkillList] = useState([])

    const skillListFetchApiAction = () => {
        dispatch(skillsFetchListApi({ skillType: "Language" }, (res) => {
            setSkillList(res)
        }))
    }

    useEffect(() => {
        skillListFetchApiAction()
    }, [])

    const deleteAction = (item) => {
        sweetAlertDelete().then((result) => {
            if (result === 'deleted') {
                dispatch(skillDeleteApi(item.skillId, (res) => {
                    skillListFetchApiAction()
                }))
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <>
            {/* <MainCard
                title={"Languages"}
                button={<PageHeaderButton
                    title={"Add"}
                    to={"/admin/skills/language/create"}
                    icon={<FontAwesomeIcon icon={faLanguage} />}
                />}> */}
            {
                skillList && skillList.length > 0 ? skillList.map((item, key) => {
                    return (
                        <ListItemCard key={key}>
                            <ListItemText>
                                <Typography variant={"h5"} sx={{ fontWeight: 500 }}> {item?.skillName || ""}</Typography>
                            </ListItemText>
                            <EditButton onClick={() => { navigation(`/admin/skills/language/edit`, { state: item }) }} />
                            <DeleteButton onClick={() => { deleteAction(item) }} />
                        </ListItemCard>
                    )
                }) : <NoDataPlaceholder />
            }
            {/* </MainCard> */}
        </>
    )
}
export default Languages
