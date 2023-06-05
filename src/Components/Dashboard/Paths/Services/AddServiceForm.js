import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../../CSS/Dashboard/Paths/Dash_AddServices.css'
import '../../../../CSS/Dashboard/Paths/Dashboard.css'
import Dash_Sidebar from '../../Dash_Sidebar';
import { addServiceToFirestore } from '../../../../Firebase/Firestore';

function AddServiceForm() {

    const [serviceData, setServiceData] = useState({
        photo: [],
        title: '',
        description: '',
        price: 0,
        upsellOpportunities: [
            {
              photos: [],
              description: '',
              price: 0,
            },
          ],
        category: '',
        duration: '',
        availability: '',
        location: '',
        reviews: [
            {
                rating: 0,
                description: '',
            },
        ],
        additionalOptions: [],
      });


      // THIS FUNCTION IS INTENDED FOR USERS TO BE ABLE TO LEAVE REVIEW 
      // ON THE SERVICE. NEED TO FIND A WAY TO IMPLEMENT THIS. 
      const handleReviewSubmit = (newReview) => {
        setServiceData((prevData) => ({
          ...prevData,
          reviews: [...prevData.reviews, newReview],
        }));
      };
      

    // CONST AND HANDLE CHANGE GO TOGETHER AND THEY UPDATE EVERY INPUT FIELD 
    // AND ALLOW IMAGES TO BE UPLOADED TO THE FORM 

    const MAX_IMAGES_PER_SERVICE = 10;
    const MAX_IMAGES_PER_UPSELL = 3;

    const handleChange = (e) => {
      const { name, value, files } = e.target;

      if (name === 'photo') {
          if (files.length === 1) {
          setServiceData((prevData) => ({
              ...prevData,
              [name]: files[0],
          }));
          } else if (files.length > 1) {
          const limitedFiles = Array.from(files).slice(0, MAX_IMAGES_PER_SERVICE);

          setServiceData((prevData) => ({
              ...prevData,
              [name]: limitedFiles,
          }));
          }
      } else if (name === 'upsellOpportunities') {
          const updatedUpsellOpportunities = serviceData.upsellOpportunities.map((opportunity, index) => {
          if (index.toString() === value) {
              const limitedFiles = Array.from(files).slice(0, MAX_IMAGES_PER_UPSELL);

              return {
              ...opportunity,
              photos: limitedFiles,
              };
          }
          return opportunity;
          });

          setServiceData((prevData) => ({
          ...prevData,
          upsellOpportunities: updatedUpsellOpportunities,
          }));
      } else {
          setServiceData((prevData) => ({
          ...prevData,
          [name]: value,
          }));
      }
    };

      


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Store the service data in Firestore
          await addServiceToFirestore(serviceData);
    
          // Reset the form after successful submission
          setServiceData({
            // Reset form fields
          });
        } catch (error) {
          console.error('Error submitting form: ', error);
          // Handle error (e.g., display an error message to the user)
        }
      };

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__sidebar">
          <Dash_Sidebar />
        </div>

        <div className="addService__Form">
        <form onSubmit={handleSubmit}>
      <label htmlFor="photo">Service Photo:</label>
      <input
        type="file"
        id="photo"
        name="photo"
        onChange={handleChange}
        multiple
        />


      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        onChange={handleChange}
        value={serviceData.title}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        onChange={handleChange}
        value={serviceData.description}
      ></textarea>

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        onChange={handleChange}
        value={serviceData.price}
      />

      <label htmlFor="upsellOpportunities">Upsell Opportunities:</label>
      <input
        type="file"
        id="upsellOpportunities"
        name="upsellOpportunities"
        onChange={handleChange}
        multiple // Allow multiple file selection
      />


      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        onChange={handleChange}
        value={serviceData.category}
      />

      <label htmlFor="duration">Duration:</label>
      <input
        type="text"
        id="duration"
        name="duration"
        onChange={handleChange}
        value={serviceData.duration}
      />

      <label htmlFor="availability">Availability:</label>
      <input
        type="text"
        id="availability"
        name="availability"
        onChange={handleChange}
        value={serviceData.availability}
      />

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        name="location"
        onChange={handleChange}
        value={serviceData.location}
      />

      {/* Additional fields specific to your application */}
      {/* For example: */}
      {/* 
        <label htmlFor="reviews">Reviews:</label>
        <input
          type="text"
          id="reviews"
          name="reviews"
          onChange={handleChange}
          value={serviceData.reviews}
        />
        
        <label htmlFor="additionalOptions">Additional Options:</label>
        <input
          type="text"
          id="additionalOptions"
          name="additionalOptions"
          onChange={handleChange}
          value={serviceData.additionalOptions}
        />
      */}

      <button type="submit">Add Service</button>
    </form>
        </div>



        THIS IS SERVICES
      </div>
    </div>
  );
}

export default AddServiceForm;
