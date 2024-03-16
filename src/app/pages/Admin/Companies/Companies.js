import { faBuilding, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import JumboDdMenu from '@jumbo/components/JumboDdMenu'
import Div from '@jumbo/shared/Div'
import { Typography } from '@mui/material'
import PageHeaderButton from 'app/components/Button/PageHeaderButton'
import ListCard from 'app/components/Cards/ListCard'
import MainCard from 'app/components/Cards/MainCard'
import { sweetAlertDelete } from 'app/config/sweetAlertsActions'
import { companyDeleteApi, companyFetchListApi } from 'app/services/Admin/company-services'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// const monthNames = [
//   "",
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec"
// ];

const Companies = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate()

  const [companyList, setCompanyList] = useState([])

  // const companyAddAction = () => {
  //   navigation("/admin/company/create")
  // }

  const companyListFetchApiAction = () => {
    dispatch(companyFetchListApi((res) => {
      setCompanyList(res)
    }))
  }

  useEffect(() => {
    companyListFetchApiAction()
  }, [])

  const editAction = (option, state) => {
    navigation(`/admin/company/edit`, { state })
  }

  const deleteAction = (option, item) => {
    sweetAlertDelete().then((result) => {
      if (result === 'deleted') {
        dispatch(companyDeleteApi(item.companyId, (res) => {
          companyListFetchApiAction()
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
      slug: "edit",
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
        title={"Companies"}
        button={<PageHeaderButton
          title={"Add"}
          to={"/admin/company/create"}
          icon={<FontAwesomeIcon icon={faBuilding} />} />}>
        {
          companyList && companyList.length > 0 ? companyList.map((item, key) => {
            return (
              <ListCard key={key} >
                <Div sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant={"h4"} color={"primary.main"} >{item?.companyName}</Typography>
                  <Div>
                    <JumboDdMenu
                      menuItems={menuItems}
                      item={item}
                    />
                  </Div>
                </Div>

                <Typography variant={"h6"} color={"text.secondary"} >{item?.companySize}</Typography>
                <Typography variant={"h6"} color={"text.secondary"} >Board-{item?.companyEmail}</Typography>

                <Div sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant={"h6"} color={"text.secondary"} >{item?.state}, {item?.city} </Typography>
                  <Typography
                    variant={"h6"}
                    color={"text.secondary"} >
                    Start - ( {item?.startYear} )
                  </Typography>
                </Div>
              </ListCard>
            )
          }) : < NoDataPlaceholder />
        }
      </MainCard>
    </>
  )
}

export default Companies
