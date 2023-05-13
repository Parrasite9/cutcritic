// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { addUser } from "./Firestore";
import { getAuth } from 'firebase/auth'


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
    const doc = await db.collection('users').doc(userId).get();
    if (doc.exists) {
      return doc.data();
    }
    throw new Error('User data not found');
  } catch (error) {
    console.error('Error retrieving user data:', error);
    throw error;
  }
};

// Update Account Status in Firebase (Professional Upgrades)
const updateAccountStatus = async (userId, approvalStatus) => {
  try {
    // Update the user's account status in Firebase
    await firebase.firestore().collection('users').doc(userId).update({
      approvalStatus,
    });
  } catch (error) {
    console.error('Error updating account status:', error);
    throw error;
  }
};

// Handle the user upgrade request
const handleUpgradeRequest = async (userId) => {
  try {
    // Retrieve user data from Firebase
    const userData = await getUserData(userId);

    // Verify user data with TDLR Licensees API
    const verificationResult = await verifyUserWithTDLR(userData);

    // Update user account status based on the verification result
    await updateAccountStatus(userId, verificationResult.approvalStatus);

    // Notify the user about the outcome
    await notifyUser(userId, verificationResult.approvalStatus);
  } catch (error) {
    console.error('Error handling upgrade request:', error);
    throw error;
  }
}; 


export { addUser, db, auth, getUserData, updateAccountStatus, handleUpgradeRequest }