import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import React from 'react'

const DateAndTime = ({ label, defaultValue, callBackAction, maxDate, minDate, ...props }) => {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['MobileDateTimePicker']}>
                    <DemoItem>
                        <MobileDateTimePicker
                            openTo='hours'
                            disableFuture
                            label={label}
                            defaultValue={defaultValue}
                            format="DD/MM/YYYY HH:mm"
                            onAccept={callBackAction}
                            maxDate={maxDate}
                            minDate={minDate}
                            {...props}
                        />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>
        </>
    )
}

export default DateAndTime
