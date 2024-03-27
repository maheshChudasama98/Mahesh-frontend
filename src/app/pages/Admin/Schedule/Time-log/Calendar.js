import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { timeLogListApi } from 'app/services/Admin/timelog-services';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.updateLocale('en', { week: { dow: 1 } });
const localizer = momentLocalizer(moment);

const MyCalendar = ({ callBackFun, flag, categoryFilter }) => {
    const dispatch = useDispatch();
    const currentDate = new Date();
    const [start, setStart] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toLocaleDateString('en-GB'));
    const [end, setEnd] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toLocaleDateString('en-GB'));
    const [events, setEvents] = useState([]);

    function eventStyleGetter(event, start, end, isSelected) {
        var style = { backgroundColor: event.color };
        return { style: style };
    }

    const datePickerSetValue = (slotInfo) => {
        const defaultData = { startTime: slotInfo.start, endTime: slotInfo.end }
        const timeDifferenceMs = new Date(slotInfo.end) - new Date(slotInfo.start);
        const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
        defaultData.totalTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        callBackFun(defaultData)
    }

    const dayStyleGetter = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const currentDay = new Date(date);
        currentDay.setHours(0, 0, 0, 0);

        const dayOfWeek = date.getDay();
        const isSunday = dayOfWeek === 0;
        const isSaturday = dayOfWeek === 6;
        const isToday = currentDay.getTime() === today.getTime();

        return {
            style: {
                backgroundColor: isToday ? '#90ee9080' :
                    isSunday ? '#ffc9b280' :
                        isSaturday ? '#ffe0d680' : '',
            },
        };
    };


    const handleNavigate = (newDate, view, action) => {
        let startDate;
        let endDate;
        const momentNewDate = moment(newDate);

        switch (view) {
            case 'month':
                startDate = new Date(momentNewDate.startOf('month').toDate()).toLocaleDateString('en-GB')
                endDate = new Date(momentNewDate.endOf('month').toDate()).toLocaleDateString('en-GB')
                break;
            case 'week':
                startDate = new Date(momentNewDate.startOf('week').toDate()).toLocaleDateString('en-GB')
                endDate = new Date(momentNewDate.endOf('week').toDate()).toLocaleDateString('en-GB')
                break;
            case 'day':
                startDate = new Date(momentNewDate.startOf('day').toDate()).toLocaleDateString('en-GB')
                endDate = new Date(momentNewDate.endOf('day').toDate()).toLocaleDateString('en-GB')
                break;
            default:
                console.error('Unhandled view type:', view);
                return;
        }
        setStart(startDate)
        setEnd(endDate)
    };

    useEffect(() => {
        dispatch(timeLogListApi({ start: start, end: end, category: categoryFilter },
            (res) => {
                const temp = res.map(item => ({
                    title: item.Category.categoryName,
                    start: new Date(item.startTime),
                    end: new Date(item.endTime),
                    color: item.Category.categoryColor,
                    type: item.Category.categoryIcon,
                    item: item
                }));
                setEvents(temp)
            }))

    }, [start, flag])
    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                selectable
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                onSelectEvent={event => callBackFun(event.item)}
                onNavigate={handleNavigate}
                // onView={(event) => console.log(event, "@@@@@@@@##")}
                onSelectSlot={slotInfo => {
                    if (moment(slotInfo.start).isBefore(moment(), 'minute') && moment(slotInfo.end).isBefore(moment(), 'minute')) {
                        datePickerSetValue(slotInfo);
                    } else {
                        // alert("Selection of future times is not allowed.");
                    }
                }}
                step={15}
                timeslots={4}
                dayPropGetter={dayStyleGetter}
                style={{ height: 1000 }}
            />
        </div>
    );
};

export default MyCalendar;