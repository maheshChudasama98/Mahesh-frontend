import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Typography from '@mui/material/Typography';
import IconArray from 'app/components/Inputs/Icons/IconArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';

export default function TimeLine({ list, handleClick }) {

    function formatTimestamp(timestamp) {
        const dtObject = new Date(timestamp);
        const formattedTime = dtObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const day = String(dtObject.getDate()).padStart(2, '0');
        const month = String(dtObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = String(dtObject.getFullYear()).slice(-2);
        const formattedDate = `${day}/${month}/${year}`;
        return { formattedDate: formattedDate, formattedTime: formattedTime }
    }
    return (
        <Timeline>
            {
                list && list.map((item, key) => {
                    return (
                        <TimelineItem>
                            <TimelineOppositeContent
                                sx={{ m: 'auto 0' }}
                                variant="body2"
                            >
                                {formatTimestamp(item?.startTime)?.formattedTime || ""} - {formatTimestamp(item?.endTime)?.formattedTime || ""}
                                <Typography
                                    sx={{ fontSize: '12px', }}
                                    color="text.secondary">
                                    {item?.totalTime}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector />

                                <IconButton
                                    sx={{
                                        background: item?.Category?.categoryColor,
                                        width: 35,
                                        height: 35,
                                        margin: 0.5,
                                    }}
                                    disableRipple
                                    disableFocusRipple
                                    disableTouchRipple
                                    onClick={() => {
                                        handleClick(item, "edit")
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={(IconArray.filter((icon) => icon.value == item?.Category?.categoryIcon))[0]?.icon || IconArray[0]?.icon}
                                        color={"#fff"}
                                        size='xs'
                                    />
                                </IconButton>

                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 600
                                    }}
                                    component="span">
                                    {item?.Category?.categoryName}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        color: "text.secondary"
                                    }}>
                                    {item?.details || '...'}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    )
                })
            }
        </Timeline >
    );
}
