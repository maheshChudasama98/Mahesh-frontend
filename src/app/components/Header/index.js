import React from 'react'
import 'app/styles/header.css'
import Div from '@jumbo/shared/Div'
import { IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Index = () => {
  const navigate = useNavigate()
  const matchesTabletView = useMediaQuery('(max-width: 550px)');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };

  const menuOptions = [
    { name: "HOME", navigate: "/dashboard", },
    { name: "PROFILE", navigate: "/profile", },
    // { name: "SING-UP", navigate: "/singup", },
    { name: "LOGIN", navigate: "/login", },
  ]

  return (
    <>
      <Div className='header-main-div' >
        <Div className='header-name-div' >
          <img
            style={{ width: "90px", height: "auto" }}
            src={`/images/logoDark.png`}
          />
        </Div>

        <Div className='header-option-div'>
          {!matchesTabletView ?
            <ul>
              {menuOptions.map((option, key) => (
                <li onClick={() => navigate(option?.navigate)}> <h4 style={{ margin: 0, fontWeight: 600 }}>{option?.name}</h4> </li>
              ))}
            </ul> :
            <>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: '100%',
                  },
                }}
              >
                {menuOptions.map((option, key) => (
                  <MenuItem
                    key={key}
                    onClick={() => { navigate(option?.navigate) }}>
                    {option?.name || ''}
                  </MenuItem>
                ))}
              </Menu>
            </>}
        </Div>
      </Div >
    </>
  )
}
export default Index
