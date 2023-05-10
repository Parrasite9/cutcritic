import React, { useState } from 'react'
import './../CSS/Login.css'
import Navbar from './Navbar'
import SignUp from './SignUp'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';


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

    // CREATES ACCOUNTS WITH GMAIL 
    function handleGoogleSignIn() {
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
  
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(`User ${user.uid} signed in with Google`);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(error.message);
      });
    }

    function handleFacebookSignIn() {
      const provider = new FacebookAuthProvider();
      const auth = getAuth()
  
      signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
  
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(`User ${user.uid} signed in with Google`);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(error.message);
        // ...
      });
    }

    // *******************************************************************
    // *******************************************************************
    // ******* GO BACK AND INSTALL FB AUTHENTICATION ON FIREBASE!!!! *****
    // ************* DELETE THIS COMMENT WHEN YOURE DONE!!!! *************
    // *******************************************************************
    // *******************************************************************


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

                <h3>Or Sign in With:</h3>

                <div className="social__SignUp">
                  <GoogleIcon style={{ marginRight: '10px' }} onClick={handleGoogleSignIn} />
                  <FacebookOutlinedIcon style={{ marginLeft: '10px' }} onClick={handleFacebookSignIn} />
                </div>

                <div className="create__account">
                  <p>Don't have an account?</p>
                  <a href="#" onClick={handleRegister}>Sign Up</a>

                </div>
            </div>
          </>
        ) : (
          <>
          <div className="signup__form">
            <SignUp getLoginForm={getLoginForm} />
            {/* <button onClick={getLoginForm}>Login</button> */}
          </div>
          </>
        )}
      </div>
    </>
  )
}

export default Login
