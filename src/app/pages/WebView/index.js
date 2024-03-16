import React, { useEffect } from 'react'
import Footer from 'app/components/Footer/index'
import { faReact, faHtml5, faCss3, faNode, faSquareJs } from '@fortawesome/free-brands-svg-icons';
import Header from 'app/components/Header/index'
import Slider from 'app/components/Slider/index'
import VideoIntroduction from 'app/components/VideoIntroduction'
import { Grid } from '@mui/material'
import Technology from 'app/components/Cards/Technology'
import ApiController from './ApiController'
import Skills from './Skills'
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

const Index = () => {
    const technologyList = [
        { title: "HTML", icon: faHtml5, value: 4.5 },
        { title: "CSS", icon: faCss3, value: 4 },
        { title: "JavaScript", icon: faSquareJs, value: 3.5 },
        { title: "React js", icon: faReact, value: 3 },
        { title: "Node js", icon: faNode, value: 3 },
        { title: "Express js", icon: faHtml5, value: 3 },
        { title: "Database", icon: faDatabase, value: 2 },
    ]

    useEffect(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }, [])

    return (
        <>
            <Header />
            <VideoIntroduction />
            <h1 style={{ marginLeft: "40px" }}>Technology skills</h1>
            <Grid container spacing={2} sx={{ paddingX: 6, marginBottom: 2 }}>
                {
                    technologyList.map((item, key) => {
                        return (
                            <Grid key={key} item xs={12} md={6} lg={4}  >
                                <Technology
                                    title={item.title}
                                    icon={item.icon}
                                    value={item.value} />
                            </Grid>
                        )
                    })
                }

            </Grid>

            <Skills />
            <ApiController />
            <Slider />
            <Footer />
        </>
    )
}

export default Index
