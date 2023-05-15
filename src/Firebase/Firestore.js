import { initializeApp } from 'firebase/app';
import { query, where, getDocs, addDoc, collection, getFirestore } from 'firebase/firestore';
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
export async function addUser(email, firstName, lastName, accountType) {
  try {
    const docRef = await addDoc(collection(db, "All__Accounts"), {
      email: email,
      first: firstName,
      last: lastName,
      accountType: accountType,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

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
