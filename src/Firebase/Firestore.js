import { initializeApp } from 'firebase/app';
import { query, where, getDocs, addDoc, collection, getFirestore, doc, writeBatch, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDkIw6H5rzBkKyiEhEKGZEPpfSbHgSB-5Q",
    authDomain: "cutcritic-940d1.firebaseapp.com",
    projectId: "cutcritic-940d1",
    storageBucket: "cutcritic-940d1.appspot.com",
    messagingSenderId: "313088351936",
    appId: "1:313088351936:web:2885e5c086bf2e1d3cd725",
    measurementId: "G-2XS9KRCCGX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

// THIS ASSIST WITH PUTTING USERS INSIDE OF THE ALL ACCOUNTS COLLECTION IN THE FIRESTORE 
export async function addUser(email, firstName, lastName, accountType, professionalData = {}) {
  try {
    const user = auth.currentUser;
    const userId = user.uid;

    const userData = {
      email: email,
      first: firstName,
      last: lastName,
      accountType: accountType,
      ...professionalData, // Include the professional fields if available
    };

    const batch = writeBatch(db);

    // Add the document to "All__Accounts" collection with the user ID as the document ID
    const allAccountsRef = doc(collection(db, "All__Accounts"), userId);
    batch.set(allAccountsRef, userData);

    // Check if the accountType is "standard" and add the document to the separate collection
    if (accountType === "standard") {
      const standardAccountsRef = doc(collection(db, "StandardAccounts"), userId);
      batch.set(standardAccountsRef, userData);
    } else if (accountType === "professional") {
      const professionalAccountsRef = doc(collection(db, "ProfessionalAccounts"), userId);
      batch.set(professionalAccountsRef, userData);
    }

    await batch.commit();

    console.log("User account created and populated in the All__Accounts collection");

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}




// IF ACC. IS UPGRADED, THIS REMOVES ACCOUNTS FROM STANDARD COLLECTION AND PLACES THEM IN UPGRADED COLLECTION
export async function upgradeAccount(email) {
  try {
    // Get the document reference from the "StandardAccounts" collection based on the user's email
    const standardAccountsQuery = query(collection(db, "StandardAccounts"), where("email", "==", email));
    const standardAccountsSnapshot = await getDocs(standardAccountsQuery);

    if (!standardAccountsSnapshot.empty) {
      // Move the user document to the "ProfessionalAccounts" collection with the user ID as the document ID
      const standardAccountDoc = standardAccountsSnapshot.docs[0];
      const userData = standardAccountDoc.data();
      const userId = standardAccountDoc.id;
      const professionalAccountsRef = doc(collection(db, "ProfessionalAccounts"), userId);
      await setDoc(professionalAccountsRef, userData);

      // Delete the user document from the "StandardAccounts" collection
      await deleteDoc(standardAccountDoc.ref);

      // Update the account type in the "All__Accounts" collection
      const allAccountsQuery = query(collection(db, "All__Accounts"), where("email", "==", email));
      const allAccountsSnapshot = await getDocs(allAccountsQuery);

      if (!allAccountsSnapshot.empty) {
        const allAccountsDoc = allAccountsSnapshot.docs[0];
        await updateDoc(allAccountsDoc.ref, { accountType: "professional" });

        console.log("Account type successfully updated in the All__Accounts collection");
      } else {
        console.log("User not found in the All__Accounts collection");
      }

      console.log("Account successfully upgraded");
    } else {
      console.log("User not found in the StandardAccounts collection");
    }
  } catch (e) {
    console.error("Error upgrading account: ", e);
  }
}


// BELOW IS THE REQUIRED FUNCTION AND CALL FOR THE DOWNGRADE. THIS NEEDS TO BE PLACED 
// IN A DIFFERENT FILE, POSSIBLY A SETTINGS PAGE WHERE IT HAS A DOWNGRADE OR DELETE ACCOUNT BUTTON. 
// THIS IS JUST HERE FOR REFERENCE 
// const handleDowngrade = async (email) => {
//   try {
//     await downgradeAccount(email);

//     // Update the account type in the "All__Accounts" collection
//     const allAccountsQuery = query(collection(db, "All__Accounts"), where("email", "==", email));
//     const allAccountsSnapshot = await getDocs(allAccountsQuery);

//     if (!allAccountsSnapshot.empty) {
//       const allAccountsDoc = allAccountsSnapshot.docs[0];
//       await updateDoc(allAccountsDoc.ref, { accountType: "standard" });

//       console.log("Account type successfully updated in the All__Accounts collection");
//     } else {
//       console.log("User not found in the All__Accounts collection");
//     }

//     console.log("Account downgrade requested");
//   } catch (error) {
//     console.error("Error handling account downgrade:", error);
//     // Handle the error appropriately (e.g., show an error message to the user)
//   }
// };


// <button onClick={() => handleDowngrade(email)}>Downgrade Account</button>


export async function fetchBarbersAndStylists() {
  try {
    const providersCollectionRef = collection(db, 'providers');
    const q = query(providersCollectionRef, where('isVerified', '==', true));
    const snapshot = await getDocs(q);
    const barbersAndStylists = snapshot.docs.map((doc) => doc.data());
    return barbersAndStylists;
  } catch (error) {
    console.error('Error fetching barbers and stylists:', error);
    return [];
  }
}

export { db, auth };
