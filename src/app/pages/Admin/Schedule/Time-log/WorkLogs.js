import React, { useEffect, useState } from 'react'
import { faCalendarDays, faChartSimple, faLayerGroup, faListUl, faTimeline, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Grid, IconButton, Tab, Tabs, Tooltip, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { timelogDeleteApi, timeLogListApi, categoryFetchListApi } from 'app/services/Admin/timelog-services'
import { sweetAlertDelete } from 'app/config/sweetAlertsActions'
import ModifyTimeLogModel from './ModifyModel'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MainCard from 'app/components/Cards/MainCard'
import PageHeaderButton from 'app/components/Button/PageHeaderButton'
import IconArray from 'app/components/Inputs/Icons/IconArray'
import LinearProgress from 'app/components/Other/LinearProgress'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import MultipleSelect from 'app/components/Inputs/Filters/MultipleSelect'
import DateRangePicker from 'app/components/Inputs/Filters/DateRangePicker'
import MyCalendar from './Calendar'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const TimeLogs = () => {
    const dispatch = useDispatch()
    const [timeLogList, setTimeLogList] = useState([])
    const [menuList, setMenuList] = useState([])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [flagCalender, setFlagCalender] = useState(0);
    const [defaultData, setDefaultData] = useState([]);

    const [startFilter, setStartFilter] = useState(new Date().toLocaleDateString('en-GB'));
    const [endFilter, setEndFilter] = useState(new Date().toLocaleDateString('en-GB'));
    const [categoryFilter, setCategoryFilter] = useState([]);

    const [total, setTotal] = useState(0);
    const [totalList, setTotalList] = useState([]);

    function convertMinutesToTime(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);
        const seconds = Math.round((totalMinutes - Math.floor(totalMinutes)) * 60);
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function calculatePercentageOfDay(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        const totalMinutesInDay = 24 * 60;
        const percentageOfDay = (totalMinutes / totalMinutesInDay) * 100;
        return Number(percentageOfDay.toFixed(1))
    }

    const fetchApiAction = () => {
        if (value == 1) {
            const temp = flagCalender + 1
            setFlagCalender(temp)
        }
        dispatch(timeLogListApi({
            start: startFilter,
            end: endFilter,
            category: categoryFilter
        }, (res) => {
            setTimeLogList(res)
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
    }

    useEffect(() => {
        fetchApiAction()
        dispatch(categoryFetchListApi((res) => {
            setMenuList(res)
        }))

    }, [])

    const handleClose = () => {
        setDefaultData([])
        setOpen(false);
    };

    function formatTimestamp(timestamp) {
        const dtObject = new Date(timestamp);
        const formattedTime = dtObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const day = String(dtObject.getDate()).padStart(2, '0');
        const month = String(dtObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = String(dtObject.getFullYear()).slice(-2);
        const formattedDate = `${day}/${month}/${year}`;
        return `${formattedDate} - ${formattedTime}`;
    }

    const handleClick = (item, type) => {
        if (type === "edit") {
            setOpen(true);
            setDefaultData(item)
        } else if (type === "delete") {
            sweetAlertDelete().then((result) => {
                if (result === 'deleted') {
                    dispatch(timelogDeleteApi(item.timelogId, (res) => {
                        fetchApiAction()
                    }))
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function calculatePercentageOfDay(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        const totalMinutesInDay = 24 * 60;
        const percentageOfDay = (totalMinutes / totalMinutesInDay) * 100;
        return percentageOfDay.toFixed(1);
    }

    return (
        <>
            <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={6} md={2}>
                    <DateRangePicker
                        label={'start'}
                        onChange={(event) => { setStartFilter(new Date(event).toLocaleDateString('en-GB')) }}
                    />

                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <DateRangePicker
                        label={'end'}
                        onChange={(event) => { setEndFilter(new Date(event).toLocaleDateString('en-GB')) }} />

                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <MultipleSelect
                        label={'Category'}
                        menuList={menuList}
                        field={"filer"}
                        valueKey={'categoryId'}
                        labelKey={'categoryName'}
                        callBack={(event) => { setCategoryFilter(event) }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Button variant="outlined" onClick={fetchApiAction}>
                        <FilterAltIcon />
                    </Button>
                </Grid>

            </Grid>

            <MainCard title={"Time Logs"}
                button={<PageHeaderButton
                    title={"Add"}
                    icon={<FontAwesomeIcon icon={faLayerGroup} />}
                    onClick={() => setOpen(true)} />}
                tabs={
                    <Tabs value={value} onChange={handleChange} sx={{ margin: "0px 20px" }} >
                        <Tab icon={<FontAwesomeIcon icon={faListUl} size='lg' />} />
                        <Tab icon={<FontAwesomeIcon icon={faCalendarDays} size='lg' />} />
                    </Tabs>
                }
                headerStyle={{ padding: "10px 20px", margin: 0 }}>
                {
                    value == 0 && timeLogList && timeLogList.length > 0 ? timeLogList.map((item, key) => {
                        const temp = calculatePercentageOfDay(item?.totalTime)
                        return (
                            <Grid container spacing={2}
                                sx={{
                                    borderBottom: timeLogList.length > key + 1 ? '1px solid' : '0px solid',
                                    borderBottomColor: 'divider',
                                    padding: 1

                                }}>
                                <Grid item xs={12} md={3} sx={{ display: "flex", alignSelf: "center", alignItems: "center" }} >
                                    <IconButton
                                        sx={{
                                            background: item?.Category?.categoryColor,
                                            width: 35,
                                            height: 35
                                        }}
                                        disableRipple
                                        disableFocusRipple
                                        disableTouchRipple
                                        onClick={() => handleClick(item, "edit")}
                                    >
                                        <FontAwesomeIcon
                                            icon={(IconArray.filter((icon) => icon.value == item?.Category?.categoryIcon))[0]?.icon || IconArray[0]?.icon}
                                            color={"#fff"}
                                            size='xs'
                                        />
                                    </IconButton>
                                    <Typography variant={"h5"} sx={{ marginLeft: 4 }} > {item?.Category?.categoryName}</Typography>
                                </Grid>



                                <Grid item xs={6} md={2} style={{ alignSelf: "center", alignItems: "center" }} >
                                    <Typography variant={"h6"}  > {formatTimestamp(item?.startTime)}</Typography>
                                </Grid>
                                <Grid item xs={6} md={2} style={{ alignSelf: "center", alignItems: "center" }} >
                                    <Typography variant={"h6"} > {formatTimestamp(item?.endTime)}</Typography>
                                </Grid>

                                <Tooltip title={`${temp}%`}>
                                    <Grid item xs={12} md={3} style={{ alignSelf: "center", alignItems: "center", paddingTop: 0, paddingBottom: 0 }}>
                                        <div sx={{ display: 'flex', alignItems: 'center', alignSelf: "center" }}>
                                            <LinearProgress
                                                value={temp}
                                                color={item?.Category?.categoryColor} />
                                        </div>
                                    </Grid>
                                </Tooltip>

                                <Grid item xs={8} md={1} sx={{ alignSelf: "center", alignItems: "center" }} >
                                    <Typography variant={"h6"} > {item?.totalTime} </Typography>
                                </Grid>


                                <Grid item xs={4} md={1} sx={{ textAlignLast: "end", alignSelf: "center", alignItems: "center" }}>
                                    <IconButton onClick={() => handleClick(item, "edit")} size='small'>
                                        <EditIcon sx={{ color: "green" }} fontSize='small' />
                                    </IconButton>
                                    <IconButton onClick={() => handleClick(item, "delete")} size='small'>
                                        <DeleteIcon fontSize="small" sx={{ color: "red" }} />
                                    </IconButton>
                                </Grid>
                            </Grid >
                        )
                    }) : value == 1 ?
                        <MyCalendar
                            callBackFun={(value) => {
                                setDefaultData(value);
                                setOpen(true);
                            }}
                            categoryFilter={categoryFilter}
                            flag={flagCalender} /> : < NoDataPlaceholder />
                }


                {/* <Box>
                    {totalList && totalList.length > 0 && totalList.map((item, key) => {
                        return (
                            <Box key={key} sx={{ margin: "auto" }} >
                                <h3 style={{ margin: 0, padding: 0 }}>{item?.categoryName}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', alignSelf: "center", margin: 0, padding: 0, }}>
                                    <LinearProgress
                                        value={item?.percentage}
                                        color={item?.categoryColor} />
                                    <h4 style={{ margin: "0px 0px 0px 10px", padding: 0 }}> {item?.percentage}% </h4>
                                    <h4 style={{ margin: "0px 0px 0px 10px", padding: 0 }}> {total} </h4>
                                </div>
                            </Box>
                        )
                    })}
                </Box> */}

            </MainCard>
            {
                open &&
                <ModifyTimeLogModel
                    open={open}
                    handleClose={handleClose}
                    list={menuList}
                    defaultData={defaultData}
                    fetchApiAction={fetchApiAction}
                />
            }
        </>
    )
}

export default TimeLogs
