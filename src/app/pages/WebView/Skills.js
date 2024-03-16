import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material'
import React from 'react'

const Skills = () => {
    return (
        <Box sx={{
            background: `url("https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")center/cover no-repeat`,
            margin: 0, padding: 0,
        }}>
            <Box sx={{ background: "#feb800d4", margin: 0, padding: 0, height: 550 }}>
                <h1 style={{ color: '#fff', fontFamily: '' }}>Skills</h1>
                <Container maxWidth="2xl">
                    <Grid container spacing={2} >
                        <Grid item md={4}>
                            <Card >
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Frontend
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={4}>
                            <Card >
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Backend
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={4}>
                            <Card >
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Other
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

export default Skills