import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

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

export async function addUser(firstName, lastName, birthYear) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: firstName,
      last: lastName,
      born: birthYear,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export { db };
