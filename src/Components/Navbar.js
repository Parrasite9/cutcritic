import React, { useEffect, useState } from 'react'
import './../CSS/Navbar.css'

// MUI ICONS 
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import GeoLocation from './GeoLocation';


function Navbar({userId}) {

  // Use state hook to track whether the menu is open or closed
  const [showMenu, setShowMenu] = useState(false) 
  // CURRENT LOG IN STATE 
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // CURRENT MOBILE STATE 
  const [isMobile, setIsMobile] = useState(true)


  // Create a function to toggle the menu open and closed
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Update isLoggedIn state to false
        setIsLoggedIn(false);
        console.log('You have logged out.');
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  // SETS MENU INITIAL DISPLAY BASED ON WINDOW LENGTH 
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

  // CHANGES USER LOGIN STATE BASED ON FIREBASE AUTHENTICATION 
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  

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
          
            {/* <BrowserRouter> */}
              {showMenu && (
                <div className="navlinks">
                  {/* IS THE USER CURRENTLY LOGGED IN?  */}
                  {isLoggedIn ? (
                    <>
                      <Link to='#' className="navlink__Item1">Home</Link>
                      <Link to='#' className="navlink__Item2">Services</Link>
                      <Link to='#' className="navlink__Item3">About</Link>
                      <Link to='#' className="navlink__Item4">My Dashboard</Link>
                      {/* CREATE A LOGOUT FUNCTION FOR THE BELOW LINK  */}
                      <Link to='/' className="navlink__Item5" onClick={handleLogout}>Logout</Link> 
                    </>
                  ) : (
                    // IS THE USER CURRENTLY LOGGED OUT? 
                    <>
                      <Link to='#' className="navlink__Item1">Home</Link>
                      <Link to='#' className="navlink__Item2">Services</Link>
                      <Link to='#' className="navlink__Item3">Link2</Link>
                      <Link to='#' className="navlink__Item4">Link3</Link>
                      <Link to='/login' className="navlink__Item5">Login</Link>
                    </>
                  )}
                </div>
              )}
            {/* </BrowserRouter> */}

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
            {/* <BrowserRouter> */}
              {showMenu && (
                <div className="navlinks">
                  {/* IS THE USER CURRENTLY LOGGED IN?  */}
                  {isLoggedIn ? (
                    <>
                      <Link to='#' className="navlink__Item1">Home</Link>
                      <Link to='#' className="navlink__Item2">Services</Link>
                      <Link to='#' className="navlink__Item3">About</Link>
                      <Link to={`/user/:id/dashboard`} className="navlink__Item4">My Dashboard</Link>
                      <Link to='#' className="navlink__Item5" onClick={handleLogout}>Logout</Link>
                      <Link to={`/upgrade`} className="navlink__Item6">Upgrade</Link>
                    </>
                  ) : (
                    // IS THE USER CURRENTLY LOGGED OUT? 
                    <>
                      <Link to='#' className="navlink__Item1">Home</Link>
                      <Link to='#' className="navlink__Item2">Services</Link>
                      <Link to='#' className="navlink__Item3">About</Link>
                      {/* <Link to='#' className="navlink__Item4">Link3</Link> */}
                      <Link to='/login' className="navlink__Item5">Login</Link>
                    </>
                  )}
                </div>
              )}
            {/* </BrowserRouter> */}
          </div>
         </>
      )}

        <div className="search__Container">
          <input type="text" placeholder='Find services' />
          <GeoLocation />
        </div>
      </div>
    </div>
  )
}

export default Navbar
