import React, { useEffect, useState } from 'react'
import './../CSS/Navbar.css'

// MUI ICONS 
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';


function Navbar() {

  // Use state hook to track whether the menu is open or closed
  const [showMenu, setShowMenu] = useState(false) 
  // CURRENT LOG IN STATE 
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // CURRENT MOBILE STATE 
  const [isMobile, setIsMobile] = useState(true)

  // ====================================
  // CREATE A FUNCTION THAT CHANGES 
  // THE LOGIN STATE 
  // ====================================







  // Create a function to toggle the menu open and closed
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }


  useEffect(() => {
    if (window.innerWidth >= 900) {
      setShowMenu(true)
      setIsMobile(false)
    } else {
      setShowMenu(false)
      setIsMobile(true)
    }

    function handleResize() {
      if (window.innerWidth >= 900) {
        setShowMenu(true)
        setIsMobile(false)
      } else {
        setShowMenu(false)
        setIsMobile(true)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='navbar'>
      <div className="navbar__Container">       

      {/* THIS IS FOR MOBILE DISPLAY */}
      {isMobile && (
         <>
            <div className="logo__Menu__Container">
              <h1>Cut Critic</h1>

              {/* Add onClick event listener to MenuIcon to toggle the menu open and closed */}

              <IconButton className='mobileIcons' alignItems="center" size='large'>
                {showMenu ? (
                  <CloseIcon fontSize='2em' onClick={toggleMenu} />
                ) : (
                  <MenuIcon fontSize='2em' onClick={toggleMenu} />
                )}
              </IconButton>
            </div>
            

            {/* Use conditional rendering to show the menu only when menuOpen is true */}
          
            {showMenu && (
              <div className="navlinks">
                {/* IS THE USER CURRENTLY LOGGED IN?  */}
                {isLoggedIn ? (
                  <>
                    <div className="navlink__Item1">Home</div>
                    <div className="navlink__Item2">Link1</div>
                    <div className="navlink__Item3">Link2</div>
                    <div className="navlink__Item4">Link3</div>
                    <div className="navlink__Item5">Logout</div>
                  </>
                ) : (
                  // IS THE USER CURRENTLY LOGGED OUT? 
                  <>
                    <div className="navlink__Item1">Home</div>
                    <div className="navlink__Item2">Link1</div>
                    <div className="navlink__Item3">Link2</div>
                    <div className="navlink__Item4">Link3</div>
                    <div className="navlink__Item5">Login</div>
                  </>
                )}
              </div>
            )}

         </>
      )}

      {/* THIS IS FOR DESKTOP DISPLAY  */}
      {!isMobile && (
         <>
            <div className="logo__Menu__Container">
              <h1>Cut Critic</h1>

              {/* Add onClick event listener to MenuIcon to toggle the menu open and closed */}

              <IconButton className='mobileIcons' alignItems="center" size='large'>
                {showMenu ? (
                  <CloseIcon fontSize='2em' onClick={toggleMenu} />
                ) : (
                  <MenuIcon fontSize='2em' onClick={toggleMenu} />
                )}
              </IconButton>
            
            

            {/* Use conditional rendering to show the menu only when menuOpen is true */}
          
            {showMenu && (
              <div className="navlinks">
                {/* IS THE USER CURRENTLY LOGGED IN?  */}
                {isLoggedIn ? (
                  <>
                    <div className="navlink__Item1">Home</div>
                    <div className="navlink__Item2">Link1</div>
                    <div className="navlink__Item3">Link2</div>
                    <div className="navlink__Item4">Link3</div>
                    <div className="navlink__Item5">Logout</div>
                  </>
                ) : (
                  // IS THE USER CURRENTLY LOGGED OUT? 
                  <>
                    <div className="navlink__Item1">Home</div>
                    <div className="navlink__Item2">Link1</div>
                    <div className="navlink__Item3">Link2</div>
                    <div className="navlink__Item4">Link3</div>
                    <div className="navlink__Item5">Login</div>
                  </>
                )}
              </div>
            )}
          </div>
         </>
      )}

        <input type="text" placeholder='Find services' />
      </div>
    </div>
  )
}

export default Navbar
