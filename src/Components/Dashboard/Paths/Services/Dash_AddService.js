import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../../CSS/Dashboard/Paths/Dash_AddServices.css'
import '../../../../CSS/Dashboard/Paths/Dashboard.css'
import Dash_Sidebar from '../../Dash_Sidebar';

function AddServices() {

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__sidebar">
          <Dash_Sidebar />
        </div>

        THIS IS SERVICES
      </div>
    </div>
  );
}

export default AddServices;
