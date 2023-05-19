// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { addUser } from "./Firestore";
import { getAuth } from 'firebase/auth'
import { sendEmail } from '../Components/Home/AccountUpgrade/sendEmail'

import { verifyUserWithTxAPI } from "../Components/Home/AccountUpgrade/StateAPIs/P-Z/Tx";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkIw6H5rzBkKyiEhEKGZEPpfSbHgSB-5Q",
  authDomain: "cutcritic-940d1.firebaseapp.com",
  projectId: "cutcritic-940d1",
  storageBucket: "cutcritic-940d1.appspot.com",
  messagingSenderId: "313088351936",
  appId: "1:313088351936:web:2885e5c086bf2e1d3cd725",
  measurementId: "G-2XS9KRCCGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "Cut Critic");
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app)




// In summary, getUserData retrieves user data from Firebase, 
// updateAccountStatus updates the account status in Firebase, 
// and handleUpgradeRequest orchestrates the process of retrieving user data, 
// verifying it with the TDLR Licensees API, updating the account status, 
// and notifying the user.
               
//                   ██▒▒▒▒▒▒▒▒▒▒▒▒██                
//                   ██▒▒▒▒▒▒▒▒▒▒▒▒██                
//                   ██▒▒▒▒▒▒▒▒▒▒▒▒██                
//                   ██▒▒▒▒▒▒▒▒▒▒▒▒██                
//                   ██▒▒▒▒▒▒▒▒▒▒▒▒██                
//                   ██▒▒▒▒▒▒▒▒▒▒▒▒██                
//                   ██▒▒▒▒▒▒▒▒▒▒▒▒██                
// ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
//   ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
//     ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██  
//       ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██    
//         ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██      
//           ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██        
//             ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██          
//               ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██            
//                 ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██              
//                   ██▒▒▒▒▒▒▒▒▒▒▒▒██                
//                     ██▒▒▒▒▒▒▒▒██                  
//                       ██▒▒▒▒██                    
//                         ████                                                   

// Retrieve user data from Firebase based on a specific user ID or other criteria
const getUserData = async (userId) => {
  try {
    console.log('getUserData - userId:', userId); // Log the userId
    const userDocRef = doc(db, 'All__Accounts', userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
    throw error;
  }
};


// Update Account Status in Firebase (Professional Upgrades)
const updateAccountStatus = async (userId, approvalStatus) => {
  try {
    const userDocRef = doc(db, 'All__Accounts', userId);
    await updateDoc(userDocRef, {
      approvalStatus: approvalStatus,
    });
  } catch (error) {
    console.error('Error updating account status:', error);
    throw error;
  }
};


const handleUpgradeRequest = async (userId, selectedState) => {
  try {
    // Retrieve user data from Firebase
    const userData = await getUserData(userId);

    // Verify user data with the appropriate verification API based on the selected state
    let verificationResult;
    if (selectedState === 'Texas') {
      verificationResult = await verifyUserWithTxAPI(userData);
    } else if (selectedState === 'Arizona') {
      // verificationResult = await verifyUserWithAzAPI(userData);
    } else {
      // Handle other states or provide a default behavior
      // For example, you can set verificationResult to a default value
      verificationResult = { approvalStatus: 'Unknown' };
    }

    // Update user account status based on the verification result
    await updateAccountStatus(userId, verificationResult.approvalStatus);

    // Notify the user about the outcome
    await notifyUser(userId, verificationResult.approvalStatus);
  } catch (error) {
    console.error('Error handling upgrade request:', error);
    throw error;
  }
};


const notifyUser = async (userId, approvalStatus) => {
  try {
    // Implement your notification logic here
    // This can include sending an email, a push notification, or updating a field in the user document to indicate the approval status

    // Example: Send an email to the user
    const user = await getUserData(userId);
    const email = user.email;
    const subject = `Upgrade Request Outcome`;
    const message = `Your upgrade request has been ${approvalStatus}.`;
    await sendEmail(email, subject, message);

    // Example: Update a field in the user document to indicate the approval status
    const userDocRef = doc(db, 'All__Accounts', userId);
    await updateDoc(userDocRef, {
      upgradeStatus: approvalStatus,
    });

    // Additional logic if needed

  } catch (error) {
    console.error('Error notifying user:', error);
    // Handle the error appropriately (e.g., log the error, show an error message, etc.)
  }
};

const updateUserData = async (userId, userData) => {
  try {
    const userDocRef = doc(db, 'All__Accounts', userId);
    await updateDoc(userDocRef, userData);
    console.log('User data updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};


export { addUser, db, auth, getUserData, updateAccountStatus, handleUpgradeRequest, notifyUser, updateUserData }
export default app