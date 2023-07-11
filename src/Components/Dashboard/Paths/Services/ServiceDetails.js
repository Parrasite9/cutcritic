import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

function ServiceDetails({ userId }) {
  const { serviceId } = useParams();
  const location = useLocation();
  const { service } = location.state;

  return (
    <div>
      <h1>Service Details</h1>
      <h2>Service ID: {serviceId}</h2>
      <h2>User ID: {userId}</h2>
      <h3>Service Title: {service.serviceData.title}</h3>
      <p>Price: {service.serviceData.price}</p>
      {/* Render other details of the service */}
    </div>
  );
}

export default ServiceDetails;
