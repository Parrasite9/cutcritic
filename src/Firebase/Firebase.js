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



export { addUser, db, auth }