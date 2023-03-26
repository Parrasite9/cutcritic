import React from 'react'
import './../CSS/Navbar.css'

// MUI ICONS 
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


function Navbar() {
  return (
    <div className='navbar'>
      <div className="navbar__Container">
        <div className="logo__Menu__Container">
          <h1>Cut Critic</h1>

          <IconButton alignItems="center" size='large'>
            <MenuIcon fontSize='2em' />
          </IconButton>
        </div>

        <input type="text" placeholder='Find services' />
      </div>
    </div>
  )
}

export default Navbar
