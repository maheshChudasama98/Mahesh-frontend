import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'app/styles/slider.css';

import { Box, Typography } from '@mui/material';

const Index = () => {
    const settings = {
        dots: true,
        fade: true,
        waitForAnimate: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        slickNext: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const imageStyle = {
        height: "600px",
        display: "block",
        justifyContent: "center",
        alignItems: "center",
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }

    return (
        <div style={{ width: '100%', background: "rgba(0, 0, 0, 0.7)", position: "relative", }}>
            <Box sx={{ color: "#fff", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <Typography sx={{ fontSize: "60px", margin: "0", color: "#feb800", textAlignLast: "center" }}>Mahesh Chudasama</Typography>
                <Typography sx={{ fontSize: "30px", margin: "0", color: "#fff", textAlignLast: "center" }}>Efficient Solutions for Your Online Presence</Typography>
                <Typography sx={{ fontSize: "20px", margin: "20px 0", color: "#fff", textAlignLast: "center" }}>From design to deployment, we've got the expertise you need.</Typography>
            </Box>
            <Slider {...settings}>
                <Box sx={{
                    ...imageStyle,
                    background: `url("https://images.pexels.com/photos/20220218/pexels-photo-20220218/free-photo-of-point-break.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") center/cover no-repeat`,
                }} />
                <Box sx={{
                    ...imageStyle,
                    background: `url("https://images.pexels.com/photos/927451/pexels-photo-927451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") center/cover no-repeat`,
                }} />
                <Box sx={{
                    ...imageStyle,
                    background: `url("https://images.pexels.com/photos/20432992/pexels-photo-20432992/free-photo-of-funchal-at-madeira.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") center/cover no-repeat`,
                }} />
                <Box sx={{
                    ...imageStyle,
                    background: `url("https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")center/cover no-repeat`,
                }} />

            </Slider>
        </div >
    );
};

export default Index;
