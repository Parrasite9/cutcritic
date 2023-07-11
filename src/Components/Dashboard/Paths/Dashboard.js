import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../../CSS/Dashboard/Paths/Dashboard.css'
import Dash_Sidebar from '../Dash_Sidebar'
import Greeting from './Greeting'
import Overview_Calender from '../Overview/Overview_Calender'
import Overview__TopClients from '../Overview/Overview_TopClients'


function Dashboard({userId}) {
  
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

  if (userId === null) {
    // User is not authenticated yet, show loading or login screen
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__sidebar">
          <Dash_Sidebar />
        </div>
        {/* {largeView && <Dash_Sidebar />} */}
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
              <Greeting userId={userId}/>
              <div className="overview__Grid1">
                <div className="grid__Item1">
                  <Overview_Calender />
                </div>

                <div className="grid__Item2">
                  <h4>Todays Appointments</h4>
                  <div>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
              </div>

              <div className="overview__Grid2">
                <div className="grid__Item3">
                  <h4>Project Directory</h4>
                </div>
                <div className="grid__Item4">
                  <h4>New Comments</h4>
                </div>
                <div className="grid__Item5">
                  <h4>Top Clients</h4>
                  <Overview__TopClients />
                </div>

              </div>
            </div>





          </>
        )}
      </div>
    </div>

    </>
  )
}

export default Dashboard
