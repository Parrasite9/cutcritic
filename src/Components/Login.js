import React, { useState } from 'react'
import './../CSS/Login.css'
import Navbar from './Navbar'
import SignUp from './SignUp'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function Login() {

  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleRegister = () => {
    setShowSignUp(true)
    setShowLogin(false)
  }

  const handleLogin = () => {
    setShowLogin(true)
    setShowSignUp(false)
  }


  const handleSignIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }


  return (
    <>
      <Navbar />
      <div className='login'>
        {!showSignUp ? (
          <>
            <label>
              User Name
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            {errorMessage && <p>{errorMessage}</p>}
            <button onClick={handleSignIn}>Sign In</button>
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
