import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../../CSS/Dashboard/Paths/Dash_AddServices.css'
import '../../../../CSS/Dashboard/Paths/Dashboard.css'
import Dash_Sidebar from '../../Dash_Sidebar';

function AddServices() {

  const [selectService, setSelectService] = useState(true)
  const [displayServices, setDisplayServices] = useState(false)
  const [displayUpsell, setDisplayUpsell] = useState(false)


  const showSelectService = () => {
    setDisplayServices(false)
    setDisplayUpsell(false)
    setSelectService(true)
  }

  const showServices = () => {
    setDisplayServices(true)
    setDisplayUpsell(false)
    setSelectService(false)
  }

  const showUpsell = () => {
    setDisplayServices(false)
    setDisplayUpsell(true)
    setSelectService(false)
  }



  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__sidebar">
          <Dash_Sidebar />
        </div>

        {/* SERVICES OR UPSELL (SELECT ONE) */}
        {selectService && (
          <div className="service__and__upsell__container">
            <div className="service">
              <img src="/images/Dashboard/service.jpg" alt="services" onClick={showServices} />
              <h1>Services</h1>
            </div>

            <div className="upsell">
              <img src="/images/Dashboard/upsell.jpg" alt="upsell" onClick={showUpsell} />
              <h1>Upsell</h1>
            </div>
          </div> 
        )}

        {/* SERVICES CONDITIONAL */}
        {displayServices && (
          <div className="displayServices">
            <h1>THIS IS SERVICES</h1>
            <button onClick={showSelectService}>RETURN</button>
          </div>
        )}

        {/* UPSELL CONDITIONAL  */}
        {displayUpsell && (
          <div className="displayServices">
            <h1>THIS IS UPSELL</h1>
            <button onClick={showSelectService}>RETURN</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default AddServices;
