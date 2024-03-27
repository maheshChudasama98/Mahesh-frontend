import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
export default function FormPropsDatePickers({ label, onChange, maxDate, minDate, defaultDate, ...props }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                closeOnSelect
                format='DD/MM/YYYY'
                label={label}
                fullWidth
                // value={defaultDate}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        size: 'small',
                    }
                }}
                onChange={onChange}
                maxDate={maxDate}
                minDate={minDate}
                {...props}
            />
        </LocalizationProvider>
    );
}
