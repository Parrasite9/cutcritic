import axios from 'axios';

const verifyUserWithTxAPI = async (userData) => {
  try {
    // Make an HTTP request to the Texas API
    const response = await axios.get('https://data.texas.gov/resource/7358-krk7.json', {
      params: {
        license_number: userData.licenseNumber,
      },
    });

    // Get the license data from the API response
    const licenseData = response.data;

    // Check if the license data is empty
    if (licenseData.length === 0) {
      return false; // License number not found in the API records
    }

    // Extract the first entry from the license data
    const licenseEntry = licenseData[0];

    // Format the user's first and last name
    const formattedFirstName = userData.firstName.toUpperCase();
    const formattedLastName = userData.lastName.toUpperCase();
    const formattedFullName = `${formattedLastName}, ${formattedFirstName}`;

    // Extract the first name from the owner's name in the license entry
    const ownerNameParts = licenseEntry.owner_name.split(',').map(part => part.trim().toUpperCase());
    const ownerLastName = ownerNameParts[0];
    const ownerFirstName = ownerNameParts[1].split(' ')[0]; // Extract the first name

    // Compare the license data with user data
    const isMatch =
      licenseEntry.license_type === userData.licenseType &&
      licenseEntry.license_number === userData.licenseNumber &&
      licenseEntry.license_expiration_date_mmddccyy &&
      ownerLastName === formattedLastName &&
      ownerFirstName === formattedFirstName;

    // Return the verification result
    return isMatch;
  } catch (error) {
    console.error('Error verifying user with Texas API:', error);
    throw error;
  }
};

export { verifyUserWithTxAPI };
