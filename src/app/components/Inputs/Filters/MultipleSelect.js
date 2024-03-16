import React from 'react';
import { Autocomplete, Checkbox, Chip, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const MultiSelectMenu = ({ label, menuList, valueKey, labelKey, callBack, ...props }) => {
    const { t } = useTranslation();

    const handleChange = (_, newValue) => {
        const arrayOfIds = newValue.map((item) => item[valueKey]);
        callBack(arrayOfIds);
    };

    return (
        <Autocomplete
            id={label}
            fullWidth
            limitTags={2}
            multiple
            size='small'
            disableCloseOnSelect
            options={menuList}
            getOptionLabel={(option) => option[labelKey]}
            // value={menuList.filter((option) => formik.values[field]?.includes(option[valueKey]))}
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
            // renderOption={(props, option, { selected }) => (
            //     <li {...props}>
            //         <Checkbox
            //             icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            //             checkedIcon={<CheckBoxIcon fontSize="small" />}
            //             style={{ marginRight: 8 }}
            //             checked={selected}
            //         />
            //         {option[labelKey]}
            //     </li>
            // )}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip size='small' key={index} label={option[labelKey]} {...getTagProps({ index })} />
                ))
            }
            noOptionsText={t('datanotfound')}
            disableClearable={true}
            {...props}
        />
    );
};

export default MultiSelectMenu;
