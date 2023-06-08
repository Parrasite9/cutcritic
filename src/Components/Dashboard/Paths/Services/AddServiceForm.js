import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../../../../CSS/Dashboard/Paths/AddServiceForm.css'
import '../../../../CSS/Dashboard/Paths/Dashboard.css'
import Dash_Sidebar from '../../Dash_Sidebar';
import { addServiceToFirestore, db } from '../../../../Firebase/Firestore';
import { useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getUserData } from '../../../../Firebase/Firebase';

function AddServiceForm() {
    const {id} = useParams();
    const userId = id;
    // const location = useLocation();
    // const userId = location.userId;

    const [zipError, setZipError] = useState('')
    const [description, setDescription] = useState('')
    const [characterCount, setCharacterCount] = useState(300)
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

    useEffect(() => {
        const remainingCharacters = 300 - description.length;
        setCharacterCount(remainingCharacters)
    }, [description])

    console.log(userId);

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
      setDescription(value)
    
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
        const updatedUpsellOpportunities = serviceData.upsellOpportunities.map(
          (opportunity, index) => {
            if (index.toString() === value) {
              const limitedFiles = Array.from(files).slice(0, MAX_IMAGES_PER_UPSELL);
    
              return {
                ...opportunity,
                photos: limitedFiles,
              };
            }
            return opportunity;
          }
        );
    
        setServiceData((prevData) => ({
          ...prevData,
          upsellOpportunities: updatedUpsellOpportunities,
        }));
      } else if (name === 'location') {
        const zipCode = value.replace(/\D/g, ''); // Remove non-digit characters
        if (zipCode.length !== 5) {
          setZipError('Your zipcode must be 5 digits long');
        } else {
          setZipError('');
        }
        setServiceData((prevData) => ({
          ...prevData,
          [name]: zipCode,
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
          const userDocRef = doc(db, 'All__Accounts', userId);
          const userDocSnapshot = await getDoc(userDocRef);
      
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
      
            // Merge the existing user data with the new service data
            const updatedUserData = {
              ...userData,
              serviceData: serviceData,
            };
      
            // Update the Firestore document with the updated user data
            await Promise.all([
              updateDoc(userDocRef, updatedUserData),
              updateDoc(doc(db, 'ProfessionalAccounts', userId), updatedUserData)
            ]);
      
            // Reset the form after successful submission
            setServiceData({
              // Reset form fields
            });
      
            console.log('Service data updated in All__Accounts and ProfessionalAccounts');
          } else {
            console.log('User document not found');
          }
        } catch (error) {
          console.error('Error submitting form: ', error);
          // Handle error (e.g., display an error message to the user)
        }
      };
      
      
      
      
      
      

    //   MAKES LOCATION INPUT A 5 DIGIT ZIPCODE ONLY 
    const handleNumericInput = (event) => {
        event.target.value = event.target.value.replace(/\D/g, '');
        // This regular expression /\D/g matches all non-digit characters and replaces them with an empty string
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
                    placeholder='Title'
                    required
                />

            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    value={serviceData.description}
                    maxLength={300}
                    placeholder='Insert Service Description'
                    required
                ></textarea>
                <div>Characters Remaining: {characterCount}</div>
            </div>

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
                    onInput={handleNumericInput}
                    placeholder='Service Zipcode'
                    maxLength={5}
                    required
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
