import { useTheme } from '@emotion/react'
import { faFacebook, faGithub, faLinkedin, faSquareFacebook, faSquareGithub, faSquareTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLocationPin, faSquareEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Div from '@jumbo/shared/Div'
import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'

const Index = () => {
  const theme = useTheme()
  return (
    <>
      <Div
        sx={{
          background: "#000",
          padding: "20px",
          marginTop: 3
        }}>
        <Div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <img
              style={{ width: "200px", height: "auto", margin: "auto" }}
              src={`/images/logoLight.png`}
              alt="Logo" />
          </div>
          <Typography variant='h6' style={{ color: "#aaa", alignItems: 'center', fontSize: "11px", textAlign: 'center' }} >
            Anamika Society, University road,Rajkot- 360005
          </Typography>
          <Typography variant='h6' style={{ color: "#aaa", alignItems: 'center', fontSize: "11px", textAlign: 'center' }} >
            mahesh.chudasama@gmail.com
          </Typography>
          <Typography variant='h6' style={{ color: "#aaa", alignItems: 'center', fontSize: "11px", textAlign: 'center' }} >
            +91 7202841815
          </Typography>

          <Div style={{ textAlign: 'center' }}>
            <FontAwesomeIcon style={{ color: "#fff", margin: 5 }} size='xl' icon={faSquareFacebook} />
            <FontAwesomeIcon style={{ color: "#fff", margin: 5 }} size='xl' icon={faSquareTwitter} />
            <FontAwesomeIcon style={{ color: "#fff", margin: 5 }} size='xl' icon={faSquareEnvelope} />
            <FontAwesomeIcon style={{ color: "#fff", margin: 5 }} size='xl' icon={faLinkedin} />
            <FontAwesomeIcon style={{ color: "#fff", margin: 5 }} size='xl' icon={faSquareGithub} />
          </Div>

          <Div sx={{ borderTop: 1 }} />
          <h4 style={{ color: '#feb800', textAlign: "center" }} >© 2024 Mahesh Chudasama. All Rights Reserved.</h4>
        </Div>
      </Div>
    </>
  )
}

export default Index
