// import { Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
const LiveAge = () => {
    const [ageInfo, setAgeInfo] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        lifeExpectancy: "You have a lot of life ahead!",
        mitenust: "mitenust changes with time!"
    });

    const calculateAgeWithMitenust = () => {
        const birthdate = "29-09-1998";
        const birthdateArray = birthdate.split('-');
        const birthYear = parseInt(birthdateArray[2]);
        const birthMonth = parseInt(birthdateArray[1]);
        const birthDay = parseInt(birthdateArray[0]);

        const currentDate = new Date();

        let age = currentDate.getFullYear() - birthYear;
        let monthDiff = currentDate.getMonth() + 1 - birthMonth;
        let dayDiff = currentDate.getDate() - birthDay;

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        if (monthDiff < 0) {
            monthDiff += 12;
        }
        if (dayDiff < 0) {
            const lastMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            dayDiff += lastMonthDays;
            monthDiff--;
        }

        // const totalDays = age * 365 + monthDiff * 30 + dayDiff;
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const currentSeconds = currentDate.getSeconds();

        // Calculate live mitenust based on current time
        const liveMitenust = `${age}:${monthDiff}:${dayDiff}:${currentHours}:${currentMinutes}:${currentSeconds}`;

        setAgeInfo({
            years: age,
            months: monthDiff,
            days: dayDiff,
            hours: currentHours,
            minutes: currentMinutes,
            seconds: currentSeconds,
            lifeExpectancy: "You have a lot of life ahead!",
            mitenust: liveMitenust
        });

        // Request the next animation frame
        requestAnimationFrame(calculateAgeWithMitenust);
    };


    // const title = "Welcome Back!";
    // const options = { body: "Thanks for returning to our site!" };

    useEffect(() => {
        // sendNotification(title, options);
        calculateAgeWithMitenust();
    }, []);
    return (
        <div>
            <div
                style={{
                    borderRadius: "40px",
                    padding: "15px",
                    width: "100%",
                    margin: "30px auto",
                    background: 'linear-gradient(to bottom,rgba(186, 216, 242, 0.5) , rgba(174,199, 240, 0.5) )',
                }}>

                <div
                    style={{
                        padding: "15px",
                        borderRadius: "30px",
                        background: 'linear-gradient(to bottom, #6cbbfe, #1087ff)',
                    }}>
                    <h1 variant={"h1"} style={{ marginY: 1, textAlign: "center", color: "#fff", margin: 0, padding: 2 }}>
                        {`${ageInfo?.years} Years`}
                    </h1>
                    <h2 variant={"h1"} style={{ marginY: 1, textAlign: "center", color: "#fff", margin: 0, padding: 2 }}>
                        {` ${ageInfo?.months} Months - ${ageInfo?.days} Days`}
                    </h2>
                    <h2 variant={"h1"} style={{ marginY: 1, textAlign: "center", color: "#fff", margin: 0, padding: 0 }}>
                        {`${ageInfo?.hours}:${ageInfo?.minutes}:${ageInfo?.seconds}`}
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default LiveAge