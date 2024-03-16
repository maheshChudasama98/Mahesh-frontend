import { TextField } from '@mui/material'
import React from 'react'

const SelectMenu = ({ labelId, label, menuItem, handleChange }) => {
    return (
        <>

            <FormControl fullWidth >
                <TextField
                    select
                    fullWidth
                    labelId={labelId}
                    label={label}
                    id={labelId}
                    name={labelId}
                    required
                    onBlur={handleBlur}
                    value={values.categoryId}
                    onChange={handleChange}
                    error={touched.categoryId && Boolean(errors.categoryId)}
                    helperText={touched.categoryId && errors.categoryId}
                >
                    {
                        menuItem && menuItem.length > 0 ? menuItem.map((item, key) => (
                            <MenuItem key={key} value={`${item?.categoryId || ''}`} >
                                <div style={{ display: 'flex', width: '100%', justifyContent: "space-between" }}>
                                    {key + 1} - {item?.categoryName}
                                    <div
                                        style={{
                                            width: 20,
                                            height: 20,
                                            background: item?.categoryColor,
                                            borderRadius: 25
                                        }}>
                                    </div>
                                </div>
                            </MenuItem>
                        )) :
                            <MenuItem disabled >
                                {"Not Data found!"}
                            </MenuItem>
                    }
                </TextField>
            </FormControl>
        </>
    )
}

export default SelectMenu
