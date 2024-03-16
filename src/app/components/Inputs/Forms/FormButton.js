import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';

const FormButton = ({ type, title, to, state, ...props }) => {
    return (
        <>
            {
                type == "submit" &&
                <Button
                    style={{ background: 'green' }}
                    size='small'
                    variant="contained"
                    type='submit'
                    {...props}>
                    {title || type}
                </Button>
            }
            {
                type == "cancel" &&
                <Link to={to} state={state}>
                    <Button
                        style={{ background: 'red' }}
                        size='small'
                        variant="contained"
                        type='rest'
                        sx={{ ml: 1 }}
                        {...props}>
                        {title || type}
                    </Button>
                </Link>
            }
        </>
    )
}

export default FormButton