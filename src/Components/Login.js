import React, { useState } from 'react'
import './../CSS/Login.css'
import Navbar from './Navbar'
import SignUp from './SignUp'

function Login() {

  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(true)

  const handleRegister = () => {
    setShowSignUp(true)
    setShowLogin(false)
  }

  const handleLogin = () => {
    setShowLogin(true)
    setShowSignUp(false)
  }


  return (
    <>
      <Navbar />
      <div className='login'>
        {!showSignUp ? (
          <>
            <label>
              User Name
              <input type="text" required />
            </label>
            <label>
              Password
              <input type="password" required />
            </label>
            <button>Sign In</button>
            <button onClick={handleRegister}>Sign Up</button>
          </>
        ) : (
          <>
            <SignUp />
            <button onClick={handleLogin}>Login</button>
          </>
        )}
      </div>
    </>
  )
}

export default Login
