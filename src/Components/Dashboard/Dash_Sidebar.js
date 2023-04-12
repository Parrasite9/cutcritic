import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import '../../CSS/Dashboard/Dash_Sidebar.css'

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
            <Link to='#'>Overview</Link>
            <Link to='/user/:id/dashboard/bookings'>Bookings</Link>
            <Link to='#'>Messages</Link>
            <Link to='#'>Reports</Link>
            <Link to='#'>Add On</Link>
          </div>
            <div className="bottom__Nav">
                <Link to='#'>Settings</Link>
                <Link to='#'>Exit</Link>

            </div>

        </div>
      )}
    </div>
  )
}


export default Dash_Sidebar
