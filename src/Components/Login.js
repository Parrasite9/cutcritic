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
            <div className="login__container">
              <div className="input__container">
              <p class="login">Log in to Cut Critic</p>
                  <input 
                    type="text" 
                    placeholder='Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required />

                  <input 
                    type="password" 
                    placeholder='Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    onKeyDown={(e) => {if (e.key === 'Enter') {handleSignIn()}}} 
                    required />
              </div>

                {errorMessage && <p>{errorMessage}</p>}
                <button className='signIn__button' onClick={handleSignIn}>Sign In</button>
                <button className='forgotPass__button'>Forgot Password</button>

                <div className="create__account">
                  <p>Don't have an account?</p>
                  <a href="#" onClick={handleRegister}>Sign Up</a>

                </div>
            </div>
          </>
        ) : (
          <>
          <div className="signup__form">
            <SignUp />
            <button onClick={getLoginForm}>Login</button>
          </div>
          </>
        )}
      </div>
    </>
  )
}

export default Login
