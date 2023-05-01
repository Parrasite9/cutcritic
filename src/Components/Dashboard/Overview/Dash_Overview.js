import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../CSS/Dashboard/Dashboard.css'
import Dash_Sidebar from './Dash_Sidebar'
import Overview_Calender from './Overview/Overview_Calender'


function Dash_Overview() {
  
  const [largeView, setLargeView] = useState(false)

    // THIS USE EFFECT MAKES IT TO ONLY SHOW SIDEBAR WITH 900PX
    // OR GREATER. IT ALSO UPDATES IN REAL TIME WHEN THIS CRITERIA IS MET OR NOT
    useEffect(() => {
      if (window.innerWidth >= 900) {
          setLargeView(true)
      } else {
          setLargeView(false)
      }

      function handleLargeViewDash() {
          if (window.innerWidth >= 900) {
              setLargeView(true)
          } else {
              setLargeView(false)
          }
      } 

      window.addEventListener('resize', handleLargeViewDash)

      return () => window.removeEventListener('resize', handleLargeViewDash)
  }, [])


  return (
    <>
      <Dash_Sidebar />
      {/* THE FOLLOWING GRID DISPLAYS AS FOLLOWS 
    ------------------------
    |          |            |
    |   1      |       2    |
    |__________|____________| 
    |          |            |
    |   3      |       4    |
    |__________|____________| */}
      {largeView && (
        <>
          <div className="overview__Grid">
            <Overview_Calender />
          </div>
        </>
      )}
    </>
  )
}

export default Dash_Overview
