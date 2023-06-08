import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'

import './App.css'
import SignUp from './Components/Home/SignUp'
import Login from './Components/Home/Login'
import Home from './Components/Home/Home'
import Booking from './Components/Booking'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Dashboard from './Components/Dashboard/Paths/Dashboard'
import UpgradePage from './Components/Home/AccountUpgrade/UpgradePage'
import Dash_AddService from './Components/Dashboard/Paths/Services/Dash_AddService'
import AddServiceForm from './Components/Dashboard/Paths/Services/AddServiceForm'


function App() {

  const [userId, setUserId] = useState(null)

  // const { id } = useParams()



  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUserId(uid)
        // ...
        console.log('user is signed in');
        console.log('Your uid is: ' + uid);
      } else {
        // User is signed out
        // ...
        setUserId(null)
        console.log('user is signed out');
      }
    });
  }, [])

  return (
    
      <BrowserRouter>
        <Routes>
          {/* MAIN ROUTES  */}
          <Route path='/' element={<Home userId={userId} />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/user/:id/dashboard' element={<Dashboard userId={userId} />} />

          <Route path='/login' element={<Login />}  />

          {/* DASHBOARD ROUTES  */}
          <Route path='/user/:id/dashboard/bookings' element={<Booking userId={userId} />} />
          <Route path='/user/:id/dashboard/services' element={<Dash_AddService userId={userId} />} />
          <Route path='/user/:id/dashboard/services/service_form' element={<AddServiceForm userId={userId} />} />

          {/* UPGRADE ACCOUNT ROUTE  */}
          <Route path='/upgrade' element={<UpgradePage userId={userId} />} />


        </Routes>
      </BrowserRouter>
      
  )
}

export default App
