import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'

import './App.css'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Home from './Components/Home'
import Booking from './Components/Booking'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Dashboard from './Components/Dashboard/Dashboard'


function App() {

  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log('user is signed in');
      } else {
        // User is signed out
        // ...
        console.log('use is signed out');
      }
    });
  })

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/login' element={<Login />}  />

        </Routes>
      </BrowserRouter>
      
  )
}

export default App
