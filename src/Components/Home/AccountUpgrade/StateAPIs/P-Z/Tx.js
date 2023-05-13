import axios from 'axios';

const verifyUserWithTxAPI = async (userData) => {
  try {
    // Make an HTTP request to the Texas API
    // Customize the API endpoint and parameters for Texas verification
    const response = await axios.get('https://data.texas.gov/widgets/7358-krk7?mobile_redirect=true', {
      params: {
        name: userData.name,
        licenseNumber: userData.licenseNumber,
        // additional parameters specific to Texas verification
      },
    });

    // Process the response and extract the verification result
    const verificationResult = response.data.result;

    // Return the verification result
    return verificationResult;
  } catch (error) {
    console.error('Error verifying user with Texas API:', error);
    throw error;
  }
};

export { verifyUserWithTxAPI };
