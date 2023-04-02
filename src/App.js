import React from 'react'
import Navbar from './Components/Navbar'

import './App.css'
import SignUp from './Components/SignUp'
// import { Route, Router } from 'react-router'
// import { Switch } from '@mui/material'
import Login from './Components/Login'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


function App() {
  return (
    
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
      
  )
}

export default App
