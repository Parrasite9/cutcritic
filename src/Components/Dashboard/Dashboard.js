import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../CSS/Dashboard/Dashboard.css'

function Dashboard() {

    const [showSidebar, setShowSidebar] = useState(false)

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
    <div className='dashboard'>
      {showSidebar && (
          <div className="dashboard__Sidebar">
          <div className="top__Nav">
            <Link to='#'>Home</Link>
            <Link to='#'>Bookings</Link>
            <Link to='#'>Overview</Link>
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

export default Dashboard
