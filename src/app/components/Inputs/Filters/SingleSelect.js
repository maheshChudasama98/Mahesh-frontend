import React from 'react';
import { Autocomplete, Checkbox, Chip, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconArray from 'app/components/Inputs/Icons/IconArray';


const SingleSelect = ({ label, menuList, valueKey, labelKey, callBack, ...props }) => {
    const { t } = useTranslation();

    const handleChange = (newValue, value) => {
        callBack(value[valueKey]);
    };

    return (

        <Autocomplete
            fullWidth
            size='small'
            id={label}
            name={label}
            options={menuList}
            getOptionLabel={(option) => option?.[labelKey] || " "}
            onChange={handleChange}

            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t(label)}
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        'aria-label': 'Without label',
                    }}
                />
            )}
            noOptionsText={t('Not Data found!')}
            disableClearable={true}
        />
    );
};

export default SingleSelect;
