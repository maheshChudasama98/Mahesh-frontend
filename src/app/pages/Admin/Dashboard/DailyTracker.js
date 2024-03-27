import MainCard from 'app/components/Cards/MainCard';
import PieChart from 'app/components/Graphs/PieChart';
import Loader from 'app/components/loaders/BasicLoader';
import React, { useEffect, useState } from 'react'

const DailyTracker = ({ list }) => {
    const [value, setValue] = useState([]);
    function convertTimeToMinutes(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return hours * 60 + minutes + seconds / 60;
    }

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

    useEffect(() => {
        const totalTimeMap = {};
        let totalHour = 0;
        list.forEach(item => {
            const categoryName = item.Category.categoryName;
            const categoryColor = item.Category.categoryColor;
            const totalTime = item.totalTime;

            if (totalTimeMap[categoryName]) {
                totalHour = totalHour + totalTimeMap[categoryName]?.totalTime
                totalTimeMap[categoryName].totalTime += convertTimeToMinutes(totalTime);
            } else {
                totalTimeMap[categoryName] = {
                    totalTime: convertTimeToMinutes(totalTime),
                    categoryColor: categoryColor
                };
                totalHour = totalHour + totalTimeMap[categoryName]?.totalTime
            }
        });

        const result = {
            categoryName: [],
            totalTime: [],
            percentage: [],
            categoryColor: []
        }

        for (const [categoryName, { totalTime, categoryColor }] of Object.entries(totalTimeMap)) {
            const formattedTotalTime = convertMinutesToTime(totalTime);
            const percentage = Number(((totalTime / totalHour) * 100).toFixed(1));
            // const percentage = Number((totalTime / totalHour) * 100).toFixed(2);
            // const percentage = calculatePercentageOfDay(formattedTotalTime);

            result.categoryName.push(categoryName)
            result.percentage.push(percentage)
            result.categoryColor.push(categoryColor)
            result.totalTime.push(formattedTotalTime)
        }
        console.log(result);
        setValue([])
        setTimeout(() => {
            setValue(result)
        }, 500);
    }, [list])

    return (
        <>
            {
                value && value?.categoryColor?.length > 0 ?
                    <PieChart chartData={value} /> : <Loader />
            }
        </>
    )
}

export default DailyTracker