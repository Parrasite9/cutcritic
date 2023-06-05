import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../../CSS/Dashboard/Paths/Dash_AddServices.css'
import '../../../../CSS/Dashboard/Paths/Dashboard.css'
import Dash_Sidebar from '../../Dash_Sidebar';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

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
          <>
            <div className="displayServices">
              <div className="your__Services__Header">
                <h1>YOUR SERVICES</h1>
                <button onClick={showSelectService}>RETURN</button>
              </div>

              <div className="your__Services__List">
                {/* YOUR SERVICE LIST WILL GO HERE */}
                <div className="service__Item service1">1</div>
                <div className="service__Item service2">2</div>
                <div className="service__Item service3">3</div>
                <div className="service__Item service4">4</div>
                <div className="service__Item service5">5</div>

                <div className="service__Item">
                  <AddCircleOutlineOutlinedIcon fontSize='large' />
                  <h3>Add Service</h3>
                </div>
              </div>
            </div>
          </>
        )}

        {/* UPSELL CONDITIONAL  */}
        {displayUpsell && (
          <>
          <div className="displayServices">
            <div className="your__Services__Header">
              <h1>YOUR UPSELL SERVICES</h1>
              <button onClick={showSelectService}>RETURN</button>
            </div>

            <div className="your__Services__List">
              {/* YOUR SERVICE LIST WILL GO HERE */}
              <div className="service__Item service1">1</div>
              <div className="service__Item service2">2</div>
              <div className="service__Item service3">3</div>
              <div className="service__Item service4">4</div>
              <div className="service__Item service5">5</div>
            </div>
          </div>
        </>
        )}

      </div>
    </div>
  );
}

export default AddServices;
