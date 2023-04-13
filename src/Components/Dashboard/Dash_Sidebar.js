import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import '../../CSS/Dashboard/Dash_Sidebar.css'

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function Dash_Sidebar() {
    const [showSidebar, setShowSidebar] = useState(false)

    // THIS USE EFFECT MAKES IT TO ONLY SHOW SIDEBAR WITH 900PX
    // OR GREATER. IT ALSO UPDATES IN REAL TIME WHEN THIS CRITERIA IS MET OR NOT
    useEffect(() => {
        if (window.innerWidth >= 900) {
            setShowSidebar(true)
        } else {
            setShowSidebar(false)
        }

        function handleSidebarVisibility() {
            if (window.innerWidth >= 900) {
                setShowSidebar(true)
            } else {
                setShowSidebar(false)
            }
        } 

        window.addEventListener('resize', handleSidebarVisibility)

        return () => window.removeEventListener('resize', handleSidebarVisibility)
    }, [])

  return (
    <div className='dash__Sidebar'>
      {/* ONLY DISPLAYS SIDEBAR WHEN THIS IS TRUE  */}
      {showSidebar && (
          <div className="dashboard__Sidebar">
          <div className="top__Nav">
            <div className="logo__And__Link">
              <HomeOutlinedIcon />
              <Link to='#'>Overview</Link>
            </div>
            <div className="logo__And__Link">
              <CalendarMonthOutlinedIcon />
              <Link to='/user/:id/dashboard/bookings'>Bookings</Link>

            </div>
            <div className="logo__And__Link">
              <MessageOutlinedIcon />
              <Link to='#'>Messages</Link>

            </div>
            <div className="logo__And__Link">
              <AssessmentOutlinedIcon />
              <Link to='#'>Reports</Link>
            </div>
            <div className="logo__And__Link">
              <Link to='#'>Add On</Link>

            </div>


          </div>
            <div className="bottom__Nav">
              <div className="logo__And__Link">
                <SettingsOutlinedIcon />
                <Link to='#'>Settings</Link>
              </div>

              <div className="logo__And__Link">
                <ExitToAppIcon /> 
                <Link to='/'>Exit</Link>
              </div>


            </div>

        </div>
      )}
    </div>
  )
}


export default Dash_Sidebar
