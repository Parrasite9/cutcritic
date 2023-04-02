import React from 'react'
import Navbar from './Components/Navbar'

import './App.css'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Home from './Components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
      
  )
}

export default App
