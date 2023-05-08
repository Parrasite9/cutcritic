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
      {/* <div className='login'>
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
      </div> */}

      <div className='login'>
        {!showSignUp ? (
          <>


  {/* <form class="form">
      <p class="login">Log in to Cut Critic</p>
      <div class="email__input">
        <input placeholder="Email" type="text" class="fInput email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="Enter your password" type="text" class="fInput pass" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="button" value="next" class="submit" />

      </div>
      <button class="forget">forget password?</button>
      <div class="con">
        <p>don't have account?&nbsp;</p>
        <a href="#"> Sign Up</a>
      </div>
    </form> */}






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
                <button onClick={handleSignIn}>Sign In</button>
                <button>Forgot Password</button>

                <div className="create__account">
                  <p>Don't have an account?</p>
                  <a href="#" onClick={handleRegister}>Sign Up</a>

                </div>
            </div>





            {/* <label>
                User Name
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <label>
                Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              {errorMessage && <p>{errorMessage}</p>}
              <button onClick={handleSignIn}>Sign In</button>
              <button onClick={handleRegister}>Sign Up</button> */}
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
