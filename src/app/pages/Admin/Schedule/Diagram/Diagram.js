import MainCard from 'app/components/Cards/MainCard'
import HeaderCard from 'app/components/Cards/HeaderCard'
import DateRangePicker from 'app/components/Inputs/Filters/DateRangePicker'
import MultipleSelect from 'app/components/Inputs/Filters/MultipleSelect'
import SingleSelect from 'app/components/Inputs/Filters/SingleSelect'
import LinearProgress from 'app/components/Other/LinearProgress'

import { DiagramListApi, categoryFetchListApi, timeLogListApi } from 'app/services/Admin/timelog-services'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Card, Grid, } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import JumboScrollbar from '@jumbo/components/JumboScrollbar'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import LineChart from 'app/components/Graphs/LineChart'

const Diagram = () => {
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0);
    const [menuList, setMenuList] = useState([])
    const [diagram, setDiagram] = useState({});
    const [totalList, setTotalList] = useState([]);

    const [startFilter, setStartFilter] = useState(new Date().toLocaleDateString('en-GB'));
    const [endFilter, setEndFilter] = useState(new Date().toLocaleDateString('en-GB'));
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [durationFilter, setDurationFilter] = useState('');

    useEffect(() => {
        dispatch(categoryFetchListApi((res) => {
            setMenuList(res)
        }))
    }, [])

    function convertMinutesToTime(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    const fetchApiAction = () => {
        dispatch(timeLogListApi({
            start: startFilter,
            end: endFilter,
            category: categoryFilter
        }, (res) => {
            const totalTimeMap = {};
            let totalHour = 0;
            res.forEach(item => {
                const categoryName = item.Category.categoryName;
                const categoryColor = item.Category.categoryColor;
                const categoryIcon = item.Category.categoryIcon;
                const minutes = item.minutes;
                if (totalTimeMap[categoryName]) {
                    totalHour = totalHour + minutes
                    totalTimeMap[categoryName].totalMinutes = totalTimeMap[categoryName].totalMinutes + minutes;
                } else {
                    totalTimeMap[categoryName] = {
                        totalMinutes: minutes,
                        categoryColor: categoryColor,
                        categoryIcon: categoryIcon
                    }
                    totalHour = totalHour + minutes
                }
            });
            setTotal(totalHour)
            const tempObject = []
            for (const [categoryName, { totalMinutes, categoryColor, categoryIcon }] of Object.entries(totalTimeMap)) {
                const formattedTotalTime = convertMinutesToTime(totalMinutes);
                const percentage = ((totalMinutes / totalHour) * 100).toFixed(2);
                tempObject.push({
                    categoryName: categoryName,
                    categoryColor: categoryColor,
                    categoryIcon: categoryIcon,
                    percentage: parseFloat(percentage),
                    totalTime: formattedTotalTime
                })
            }
            setTotalList(tempObject)
        }))

        let flag = true
        const tempArray = []
        let durationArray = []
        dispatch(DiagramListApi({
            start: startFilter,
            end: endFilter,
            category: categoryFilter,
            duration: durationFilter
        }, (res) => {
            res.forEach(item => {
                if (flag) {
                    durationArray = (Object.keys(item?.values))
                    flag = false
                }
                tempArray.push({
                    name: item?.key,
                    color: item?.color,
                    data: Object.values(item?.values)
                })
            }
            )
            setDiagram({
                categories: durationArray,
                series: tempArray
            })
            console.log({
                categories: durationArray,
                series: tempArray
            });
        }))

    }

    const duration = [
        { key: "Weekly", value: "weekly" },
        { key: "Monthly", value: "monthly" },
        { key: "Fortnightly", value: "fortnightly" },
        { key: "Yearly", value: "yearly" },
        { key: "Daily", value: "daily" },
    ]

    return (
        <>
            <HeaderCard title={"Diagram"} ></HeaderCard>
            <Grid container spacing={2}>

                <Grid item md={3}>
                    <Card>
                        <h2 style={{ textAlign: "center" }}>Filter </h2>

                        <Box sx={{ margin: 2 }}>
                            <DateRangePicker
                                label={'Start'}
                                onChange={(event) => { setStartFilter(new Date(event).toLocaleDateString('en-GB')) }}
                            />
                        </Box>
                        <Box sx={{ margin: 2 }}>
                            <DateRangePicker
                                label={'End'}
                                onChange={(event) => { setEndFilter(new Date(event).toLocaleDateString('en-GB')) }} />
                        </Box>
                        <Box sx={{ margin: 2 }}>
                            <MultipleSelect
                                label={'Category'}
                                menuList={menuList}
                                field={"filer"}
                                valueKey={'categoryId'}
                                labelKey={'categoryName'}
                                callBack={(event) => { setCategoryFilter(event) }}
                            />
                        </Box>
                        <Box sx={{ margin: 2 }}>
                            <SingleSelect
                                label={'Duration'}
                                menuList={duration}
                                valueKey={'value'}
                                labelKey={'key'}
                                callBack={(event) => { setDurationFilter(event) }}
                            />
                        </Box>
                        <Box sx={{ margin: 2 }}>
                            <label
                                label={'Category'}
                                menuList={menuList}
                                field={"filer"}
                                valueKey={'categoryId'}
                                labelKey={'categoryName'}
                                callBack={(event) => { setCategoryFilter(event) }}
                            />
                        </Box>
                        <Box sx={{ margin: 2 }}>
                            <Button fullWidth variant="contained" onClick={fetchApiAction}>
                                <FilterAltIcon />
                            </Button>
                        </Box>

                    </Card>
                </Grid>

                <Grid item md={9}>
                    <Grid container spacing={2}>
                        <Grid item md={6}>
                            <Card>
                                <Box padding={2} sx={{ borderBottom: "1px solid #ebebeb", }}>
                                    <h2 style={{ margin: 0, padding: 0 }}>
                                        Total time   {
                                            total && total <= 1440 ?
                                                `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, '0')}` :
                                                total && total > 1440 &&
                                                `${Math.floor(total / (24 * 60))} Day ${Math.floor((total % (24 * 60)) / 60)}:${(total % 60).toString().padStart(2, '0')}`}</h2>
                                </Box>
                                <JumboScrollbar
                                    style={{ minHeight: 335 }}
                                    autoHide
                                    autoHideDuration={200}
                                    autoHideTimeout={500}>

                                    <Box margin={2}>
                                        {totalList && totalList.length > 0 ? totalList.map((item, key) => {

                                            return (
                                                <Box key={key} sx={{ margin: "auto" }} >
                                                    <h3 style={{ margin: 0, padding: 0 }}>{item?.categoryName}</h3>

                                                    <div style={{ display: 'flex', alignItems: 'center', alignSelf: "center", margin: 0, padding: 0, }}>
                                                        <LinearProgress
                                                            value={item?.percentage}
                                                            color={item?.categoryColor} />
                                                        <h4 style={{ margin: "0px 0px 0px 10px", padding: 0 }}> {item?.percentage}% </h4>
                                                        <h4 style={{ margin: "0px 0px 0px 10px", padding: 0 }}> {item?.totalTime} </h4>
                                                    </div>
                                                </Box>

                                            )
                                        }) :
                                            <NoDataPlaceholder />
                                        }
                                    </Box>
                                </JumboScrollbar>

                            </Card>
                        </Grid>
                        <Grid item md={6}>
                            <Card>
                                <Box padding={2} sx={{ borderBottom: "1px solid #ebebeb", }}>
                                    <h2 style={{ margin: 0, padding: 0 }}>
                                        Coming  </h2>
                                </Box>
                                <JumboScrollbar
                                    style={{ minHeight: 335 }}
                                    autoHide
                                    autoHideDuration={200}
                                    autoHideTimeout={500}>
                                    <NoDataPlaceholder />
                                </JumboScrollbar>
                            </Card>
                        </Grid>

                    </Grid>

                    <Card sx={{ marginY: 2 }}>
                        {diagram && Object.keys(diagram)?.length > 0 ?
                            <LineChart chartObject={diagram} />
                            : <NoDataPlaceholder />
                        }
                    </Card>
                </Grid>

            </Grid>
        </>
    )
}

export default Diagram