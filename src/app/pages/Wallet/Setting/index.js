import { TabPanel } from '@mui/lab'
import { Box, Card, Grid, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import Category from './Category'
import SubCategory from './SubCategory'
import MainCard from 'app/components/Cards/MainCard'

const Index = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Card>

            <Grid container spacing={2}>
                <Grid item sm={2}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        scrollButtons={false}>
                        <Tab label="Category" />
                        <Tab label="Sub Category" />
                        <Tab label="Goals" />
                    </Tabs>
                </Grid>
                <Grid item sm={10}>

                    {
                        value && value == 1 && <Category></Category>
                    }
                </Grid>
            </Grid>
        </Card>
    )
}

export default Index