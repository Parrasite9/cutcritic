import React, { useEffect, useState } from 'react'
import './../../../CSS/Home/AccountUpgrade/UpgradeForm.css'
import 'firebase/firestore';
import app, { auth } from '../../../Firebase/Firebase'
import { getUserData, updateAccountStatus, notifyUser, updateUserData } from '../../../Firebase/Firebase';
import { addUser, db, upgradeAccount } from '../../../Firebase/Firestore';
import { verifyUserWithTxAPI } from './StateAPIs/P-Z/Tx';
import { CatchingPokemonSharp } from '@mui/icons-material';
import { doc, updateDoc } from 'firebase/firestore';


function UpgradeForm({ userId }) {
    const statesList = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California",
        "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
        "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
        "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    const stateIssuingAuthorities = {
        Alabama: "Alabama Board of Cosmetology",
        Alaska: "Alaska Board of Barbers and Hairdressers",
        Arizona: "Arizona State Board of Cosmetology",
        Arkansas: "Arkansas Department of Health",
        California: "California Board of Barbering and Cosmetology",
        Colorado: "Colorado Office of Barber and Cosmetology Licensure",
        Connecticut: "Connecticut Department of Public Health",
        Delaware: "Delaware Board of Cosmetology and Barbering",
        Florida: "Florida Board of Cosmetology",
        Georgia: "Georgia State Board of Cosmetology and Barbers",
        Hawaii: "Hawaii Board of Barbering and Cosmetology",
        Idaho: "Idaho State Board of Cosmetology",
        Illinois: "Illinois Department of Financial and Professional Regulation",
        Indiana: "Indiana State Board of Cosmetology and Barber Examiners",
        Iowa: "Iowa Board of Cosmetology Arts and Sciences",
        Kansas: "Kansas Board of Cosmetology",
        Kentucky: "Kentucky Board of Hairdressers and Cosmetologists",
        Louisiana: "Louisiana State Board of Cosmetology",
        Maine: "Maine Board of Barbering and Cosmetology",
        Maryland: "Maryland Board of Cosmetologists",
        Massachusetts: "Massachusetts Board of Registration of Cosmetology",
        Michigan: "Michigan Board of Cosmetology",
        Minnesota: "Minnesota Board of Cosmetology",
        Mississippi: "Mississippi State Board of Cosmetology",
        Missouri: "Missouri Board of Cosmetology and Barber Examiners",
        Montana: "Montana Board of Barbers and Cosmetologists",
        Nebraska: "Nebraska Department of Health and Human Services",
        Nevada: "Nevada State Board of Cosmetology",
        New_Hampshire: "New Hampshire Board of Barbering, Cosmetology, and Esthetics",
        New_Jersey: "New Jersey State Board of Cosmetology and Hairstyling",
        New_Mexico: "New Mexico Board of Barbers and Cosmetologists",
        New_York: "New York State Department of State Division of Licensing Services",
        North_Carolina: "North Carolina Board of Cosmetic Art Examiners",
        North_Dakota: "North Dakota State Board of Cosmetology",
        Ohio: "Ohio State Board of Cosmetology",
        Oklahoma: "Oklahoma State Board of Cosmetology and Barbering",
        Oregon: "Oregon Health Licensing Office",
        Pennsylvania: "Pennsylvania State Board of Cosmetology",
        Rhode_Island: "Rhode Island Department of Health",
        South_Carolina: "South Carolina Board of Cosmetology",
        South_Dakota: "South Dakota Cosmetology Commission",
        Tennessee: "Tennessee Board of Cosmetology and Barber Examiners",
        Texas: "Texas Department of Licensing and Regulation",
        Utah: "Utah Division of Occupational and Professional Licensing",
        Vermont: "Vermont Office of Professional Regulation",
        Virginia: "Virginia Board for Barbers and Cosmetology",
        Washington: "Washington State Department of Licensing",
        West_Virginia: "West Virginia Board of Barbers and Cosmetologists",
        Wisconsin: "Wisconsin Department of Safety and Professional Services",
        Wyoming: "Wyoming Board of Cosmetology",
    };

    const licenseTypes = [
        'Cosmetologist License',
        'Esthetician License',
        'Nail Technician License',
        'Barber License',
        'Makeup Artist License',
        'Hair Braider License',
        'Massage Therapist License',
        'Electrologist License',
        'Waxing Specialist License',
        'Spa Manager License',
        'Salon Owner License',
        'Cosmetology Instructor License',
    ];
      

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [stateLicense, setStateLicense] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [licenseType, setLicenseType] = useState('');
  const [licenseIssuingAuthority, setLicenseIssuingAuthority] = useState('');

  //  const licenseIssuingAuthority = stateIssuingAuthorities[stateLicense] || '';
  const [selectedLicenseTypes, setSelectedLicenseTypes] = useState([]);

  //   THIS ALLOWS THE CHARACTERS TO BE NUMBERS ONLY
  const handleDateOfBirthChange = (e) => {
    const input = e.target.value;
    // Remove non-numeric characters
    const numericInput = input.replace(/\D/g, '');

    // Apply auto-formatting
    let formattedInput = '';
    if (numericInput.length > 0) {
      formattedInput += numericInput.slice(0, 2);
    }
    if (numericInput.length > 2) {
      formattedInput += '/' + numericInput.slice(2, 4);
    }
    if (numericInput.length > 4) {
      formattedInput += '/' + numericInput.slice(4, 8);
    }

    setDateOfBirth(numericInput);
  };

  //   THIS ALLOWS THE CHARACTERS TO BE NUMBERS ONLY
  const handleExpirationDateChange = (e) => {
    const input = e.target.value;
    // Remove non-numeric characters
    const numericInput = input.replace(/\D/g, '');
  
    // Apply auto-formatting
    let formattedInput = ''; // Declare formattedInput variable
  
    if (numericInput.length > 0) {
      formattedInput += numericInput.slice(0, 2);
    }
    if (numericInput.length > 2) {
      formattedInput += '/' + numericInput.slice(2, 4);
    }
    if (numericInput.length > 4) {
      formattedInput += '/' + numericInput.slice(4, 8);
    }
  
    setExpirationDate(formattedInput);
  };
  

  //   LICENSE TYPE 
  const handleLicenseTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedLicenseTypes((prevSelectedTypes) => [...prevSelectedTypes, value]);
    } else {
      setSelectedLicenseTypes((prevSelectedTypes) =>
        prevSelectedTypes.filter((type) => type !== value)
      );
    }
  };

  //   MAKES SURE ATLEAST ONE LICENSE TYPE (CHECKBOX) IS SELECTED 
  const isAtLeastOneCheckboxSelected = selectedLicenseTypes.length > 0;

  //   ISSUING AUTHORITY 
  const handleLicenseIssuingAuthorityChange = (selectedState) => {
    const issuingAuthority = stateIssuingAuthorities[selectedState] || '';
    setLicenseIssuingAuthority(issuingAuthority);
  };

  // Handle upgrade form submission
  const handleUpgradeREMOVE = (email) => {
    upgradeAccount(email)
        .then(() => {
        console.log("Account upgrade request submitted");
        // Additional logic after successful upgrade request (e.g., display success message)
        })
        .catch((error) => {
        console.error("Error upgrading account: ", error);
        // Handle the error appropriately (e.g., display an error message to the user)
        });
    };

    const handleUpgrade = (email) => {
        updateUserData(userId, { accountType: 'Professional' })
          .then(() => {
            console.log('Account upgrade request submitted');
            // Additional logic after successful upgrade request (e.g., display success message)
          })
          .catch((error) => {
            console.error('Error upgrading account: ', error);
            // Handle the error appropriately (e.g., display an error message to the user)
          });
      };
      

const handleSubmit__Professional__Account = async (e, stateLicense) => {
    e.preventDefault();
  
    try {
      // Retrieve user data from Firebase
      const userData = await getUserData(userId);
      console.log(userId);
      console.log('User Data:', userData);
  
      // Update the userData object with professional fields
      const updatedUserData = {
        ...userData,
        professionalFirstName: firstName,
        professionalLastName: lastName,
        licenseNumber: licenseNumber,
        licenseState: stateLicense,
        licenseExpiration: expirationDate,
      };
  
      // Verify user data with the appropriate verification API based on the selected state
      let verificationResult;
      if (stateLicense === 'Texas') {
        verificationResult = await verifyUserWithTxAPI(updatedUserData);
      } else if (stateLicense === 'Arizona') {
        // verificationResult = await verifyUserWithAzAPI(updatedUserData);
      } else {
        // Handle other states or provide a default behavior
        // For example, you can set verificationResult to a default value
        verificationResult = { approvalStatus: 'Unknown' };
      }
  
      // Update user account status based on the verification result
      await updateAccountStatus(userId, verificationResult.approvalStatus);
  
      // Notify the user about the outcome
      await notifyUser(userId, verificationResult.approvalStatus);
  
      // Call the addUser function with the updated userData
      await addUser(email, firstName, lastName, 'professional', updatedUserData);
  
      // Additional logic if needed
      handleUpgrade(); // Move the handleUpgrade() call inside the try block
    } catch (error) {
      console.error('Error handling upgrade request:', error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };

  const TEST__handleSubmit__Professional__Account__WORKING = async (e, stateLicense) => {
    e.preventDefault();
  
    try {
      // Retrieve user data from Firebase
      const userData = await getUserData(userId);
      console.log(userId);
      console.log('User Data:', userData);
  
      // Update the userData object with professional fields
      const updatedUserData = {
        ...userData,
        professionalFirstName: firstName,
        professionalLastName: lastName,
        licenseNumber: licenseNumber,
        licenseState: stateLicense,
        licenseExpiration: expirationDate,
      };
  
      console.log('Updated User Data:', updatedUserData);
  
      // Call the addUser function with the updated userData
      await addUser(email, firstName, lastName, 'professional', updatedUserData);
  
      // Update the Firestore document with the updated userData
      const userDocRef = doc(db, 'All__Accounts', userId);
      await updateDoc(userDocRef, updatedUserData);
  
      // Additional logic if needed
      handleUpgrade(email); // Move the handleUpgrade() call inside the try block
    } catch (error) {
      console.error('Error handling upgrade request:', error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };
  

const TEST__handleSubmit__Professional__Account = async (e, stateLicense) => {
  e.preventDefault();

  try {
    // Retrieve user data from Firebase
    const userData = await getUserData(userId);
    console.log(userId);
    console.log('User Data:', userData);

    // Update the userData object with professional fields
    const updatedUserData = {
      ...userData,
      professionalFirstName: firstName,
      professionalLastName: lastName,
      licenseNumber: licenseNumber,
      licenseState: stateLicense,
      licenseExpiration: expirationDate,
    };

    console.log('Updated User Data:', updatedUserData);

    // Call the verifyUserWithTxAPI function to verify the user
    const verificationResult = await verifyUserWithTxAPI(updatedUserData);
    console.log('Verification Result:', verificationResult);

    if (verificationResult.isMatch && verificationResult.approvalStatus === 'Approved') {
      // User is verified and approved

      // Call the addUser function with the updated userData
      await addUser(email, firstName, lastName, 'professional', updatedUserData);

      // Update the Firestore document with the updated userData
      const userDocRef = doc(db, 'All__Accounts', userId);
      await updateDoc(userDocRef, updatedUserData);

      // Additional logic if needed
      handleUpgrade(email); // Move the handleUpgrade() call inside the try block
    } else {
      // User is not verified or not approved
      console.log('User verification failed or not approved');
      // Handle the case accordingly (e.g., display an error message to the user)
    }
  } catch (error) {
    console.error('Error handling upgrade request:', error);
    // Handle the error appropriately (e.g., show an error message to the user)
  }
};

  
      
      
      
      
      
      
      
      
  

  
  

  useEffect(() => {
    const issuingAuthority = stateIssuingAuthorities[stateLicense] || '';
    handleLicenseIssuingAuthorityChange(stateLicense);
  }, [stateLicense]);
  
  

  return (
    <div className='upgrade__Form'>
      <div className="upgrade__Form__Container">
        <p>Sign Up to Cut Critic</p>
        <form onSubmit={(e) => TEST__handleSubmit__Professional__Account(e, stateLicense)}>

          {/* FIRST NAME */}
          <div className="upgradeForm__Input">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name *"
            />
          </div>

          {/* LAST NAME */}
          <div className="upgradeForm__Input">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name *"
              required
            />
          </div>

          {/* State of License */}
          <div className="upgradeForm__Input">
            <select 
                value={stateLicense} 
                onChange={e => setStateLicense(e.target.value)}
                required
            >
                <option value="" disabled hidden>Select State License</option>
                {statesList.map(state => (
                <option key={state} value={state}>
                    {state}
                </option>
                ))}
            </select>
            {/* {stateLicense !== "" && (
                <input
                    type="text"
                    value={licenseIssuingAuthority}
                    readOnly
                    placeholder="License Issuing Authority"
                />
                )} */}
          </div>

          {/* LICENSE AUTHORITY */}
          <div className="upgradeForm__Input">
                <input
                    type="text"
                    value={licenseIssuingAuthority}
                    readOnly
                    placeholder="License Issuing Authority"
                />
          </div>


          {/* License Number */}
          <div className="upgradeForm__Input">
            <input 
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder='License Number'
                required
                />
          </div>

          {/* LICENSE EXPIRATION */}
          <div className="upgradeForm__Input">
          <input
            type="text"
            value={expirationDate}
            onChange={handleExpirationDateChange}
            placeholder="Expiration Date MMDDYYYY"
            required
            />
          </div>
          
           {/* LICENSE TYPE */}
           <div className="upgradeForm__Input checkbox__Container">
                <label>License Types:</label>
                <div className='license__type'>
                    {licenseTypes.map((type) => (
                    <div key={type}>
                        <input
                            type="checkbox"
                            value={type}
                            checked={selectedLicenseTypes.includes(type)}
                            onChange={handleLicenseTypeChange}
                        />
                        <label>{type}</label>
                    </div>
                    ))}
                </div>
           </div>

           <div className='upgradeForm__Errors'>
                {!isAtLeastOneCheckboxSelected && (
                    <p className="error-message">Please select at least one license type.</p>
                )}
           </div>
                
          <button type='submit'>Submit Request</button>
        </form>
      </div>
    </div>
  )
}

export default UpgradeForm
