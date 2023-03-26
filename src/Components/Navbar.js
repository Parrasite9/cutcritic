import React from 'react'
import './../CSS/Navbar.css'

// MUI ICONS 
import MenuIcon from '@mui/icons-material/Menu';


function Navbar() {
  return (
    <div className='navbar'>
      <div className="navbar__Container">
        <div className="logo__Menu__Container">
          <h1>LOGO</h1>
          <MenuIcon />
        </div>

        <input type="text" placeholder='Find services' />
      </div>
    </div>
  )
}

export default Navbar
