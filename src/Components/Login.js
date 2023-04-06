import React, { useState } from 'react'
import './../CSS/Login.css'
import Navbar from './Navbar'
import SignUp from './SignUp'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch

  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleRegister = () => {
    setShowSignUp(true)
    setShowLogin(false)
  }

  const getLoginForm = () => {
    setShowLogin(true)
    setShowSignUp(false)
  }


  const handleSignIn = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }


  return (
    <>
      <Navbar/>
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
            <button onClick={getLoginForm}>Login</button>
          </>
        )}
      </div>
    </>
  )
}

export default Login
