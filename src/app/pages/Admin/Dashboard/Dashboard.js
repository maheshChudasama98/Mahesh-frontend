import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import { timeLogListApi } from 'app/services/Admin/timelog-services'
import TimeLine from '../Schedule/Time-log/TimeLine'
import DailyTracker from './DailyTracker'
import LiveAge from './LiveAge'
import MainCard from 'app/components/Cards/MainCard'
import DateRangePicker from 'app/components/Inputs/Filters/DateRangePicker'
import NoDataPlaceholder from 'app/shared/NoDataPlaceholder'
import JumboScrollbar from '@jumbo/components/JumboScrollbar'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [graphList, setGraphList] = useState([]);
  const [timeLineList, setTimeLineList] = useState([]);
  const [flag, setFlag] = useState(true);
  const [value, setValue] = useState(-1);
  const [graphStart, setGraphStart] = useState(new Date().toLocaleDateString('en-GB'));
  const [graphEnd, setGraphEnd] = useState(new Date().toLocaleDateString('en-GB'));
  const [timeLineStart, setTimeLineStart] = useState(new Date().toLocaleDateString('en-GB'));

  useEffect(() => {
    if (flag) {
      setFlag(false)
      dispatch(timeLogListApi({
        start: new Date().toLocaleDateString('en-GB'),
        end: new Date().toLocaleDateString('en-GB')
      }, (res) => {
        setGraphList(res)
        setTimeLineList(res)
      }))

    } else {
      if (value == 0) {
        setValue(-1)
        dispatch(timeLogListApi({
          start: graphStart || new Date().toLocaleDateString('en-GB'),
          end: graphEnd || new Date().toLocaleDateString('en-GB')
        }, (res) => {
          setGraphList(res)
        }))
      } else if (value == 1) {
        setValue(-1)
        dispatch(timeLogListApi({
          start: timeLineStart || new Date().toLocaleDateString('en-GB'),
          end: timeLineStart || new Date().toLocaleDateString('en-GB')
        }, (res) => {
          setTimeLineList(res)
        }))

      }

    }
  }, [value])

  return (
    <>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LiveAge />
        </Grid>
        <Grid item xs={12} md={6}>
          <MainCard title={"Daily"}
            button={
              <Box sx={{ display: { xs: "block", sm: "flex" } }}>
                <Box sx={{ width: { xs: '100%', sm: 200 }, margin: { xs: "0 0 10px  0", sm: "0 5px 0 0" } }}>
                  <DateRangePicker label={'start'} onChange={(event) => { setGraphStart(new Date(event).toLocaleDateString('en-GB')); setValue(0) }} />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 200 } }}>
                  <DateRangePicker label={'end'} onChange={(event) => { setGraphEnd(new Date(event).toLocaleDateString('en-GB')); setValue(0) }} />
                </Box>
              </Box>
            } >
            {
              graphList && graphList.length > 0 ? <DailyTracker list={graphList} /> : <NoDataPlaceholder />
            }
          </MainCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <MainCard
            title={"Time line"}
            button={<DateRangePicker label={'Select'} onChange={(event) => { setTimeLineStart(new Date(event).toLocaleDateString('en-GB')); setValue(1) }} />}>
            <JumboScrollbar
              autoHeight
              autoHeightMin={400}
              autoHide
              autoHideDuration={200}
              autoHideTimeout={500}>
              {timeLineList && timeLineList.length > 0 ? <TimeLine list={timeLineList} handleClick={() => { }} /> : <NoDataPlaceholder />}
            </JumboScrollbar>
          </MainCard>
        </Grid>

      </Grid >


    </>
  )
}

export default Dashboard