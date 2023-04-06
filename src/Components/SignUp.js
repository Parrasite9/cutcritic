import React, { useEffect, useState } from 'react'
import './../CSS/SignUp.css'
import { addUser } from '../Firebase/Firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';

function PasswordError({ errorMessage }) {
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  );
}

function SignUp() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasLength, setHasLength] = useState(false)
  const [hasUppercase, setHasUppercase] = useState(false)
  const [hasLowercase, setHasLowercase] = useState(false)
  const [hasSpecialChar, setHasSpecialChar] = useState(false)
  const [color, setColor] = useState('black')

  // IF USER DOES NOT MEET ALL PASSWORD REQUIREMENTS THEY ARE 
  // MET WITH AN ERROR MESSAGE
  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$/;
    const isValidPassword = passwordRegex.test(password);
    if (!isValidPassword) {
      setPasswordError('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.')
      return;
    } else {
      setPasswordError('');
    }
  }, [password]);

  // THIS MAKES SURE THE PASSWORD IS ATLEAST 8 CHARACTERS LONG 
  // AND CHANGES THE PASSWORD REQUIRMENT TO GREEN 
  useEffect(() => {
    if (password.length >= 8) {
      setHasLength(true)
    } else {
      setHasLength(false)
    }
  }, [password]);

  // THIS MAKES SURE THE PASSWORD HAS AN UPPERCASE 
  // AND CHANGES THE PASSWORD REQUIRMENT TO GREEN 
  useEffect(() => {
    const uppercaseRegex = /[A-Z]/
    if (uppercaseRegex.test(password)) {
      setHasUppercase(true)
    } else {
      setHasUppercase(false)
    }
  }, [password]);

  // THIS MAKES SURE THE PASSWORD HAS AN LOWERCASE 
  // AND CHANGES THE PASSWORD REQUIRMENT TO GREEN 
  useEffect(() => {
    const lowercaseRegex = /[a-z]/
    if (lowercaseRegex.test(password)) {
      setHasLowercase(true)
    } else {
      setHasLowercase(false)
    }
  }, [password]);

  // THIS MAKES SURE THE PASSWORD HAS A SPECIAL CHARACTER 
  // AND CHANGES THE PASSWORD REQUIRMENT TO GREEN 
  useEffect(() => {
    const specialCharRegex = /[!@#$%^&*()]/
    if (specialCharRegex.test(password)) {
      setHasSpecialChar(true)
    } else {
      setHasSpecialChar(false)
    }
  }, [password]);


  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value)

  //   // CHECKS IF PASSWORD MEETS LENGTH REQUIREMENT 
  //   if (e.target.value.length >= 8) {
  //     setHasLength(true)
  //   } else {
  //     setHasLength(false)
  //   }

  //   // CHECKS IF PASSWORD CONTAINS UPPERCASE LETTER 
  //   const uppercaseRegex = /[A-Z]/
  //   if (uppercaseRegex.test(e.target.value)) {
  //     setHasUppercase(true)
  //   } else {
  //     setHasUppercase(false)
  //   }

  //   // CHECKS IF PASSWORD CONTISN LOWERCASE LETTER 
  //   const lowercaseRegex = /[a-z]/
  //   if (lowercaseRegex.test(e.target.value)) {
  //     setHasLowercase(true)
  //   } else {
  //     setHasLowercase(false)
  //   }

  //   // CHECKS IF PASSWORD CONTAINS SPECIAL CHARACTER 
  //   const specialCharRegex = /[!@#$%^&*()]/
  //   if (specialCharRegex.test(e.target.value)) {
  //     setHasSpecialChar(true)
  //   } else {
  //     setHasSpecialChar(false)
  //   }


  // }

  // ONLY HANDLES EMAIL AND PASSWORD ACCOUNTS 
  function handleSubmit(e) {
    e.preventDefault();

    // CHECKS PASSWORD REQUIREMENTS
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$/;
    const isValidPassword = passwordRegex.test(password);
    console.log(isValidPassword);

    if (!isValidPassword) {
      setPasswordError('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.')
      return;
    }

    // YOU CAN PULL DEFAULT AUTHENTICATION FROM FIREBASE AUTH DOCS
    const auth = getAuth();

    // EXCEPT FOR THIS PASSWORD VALIDATION, THIS IS SELF CREATED 
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.')
      return
    } else if (password !== confPassword) {
      setPasswordError('Passwords do not match.')
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log(`User ${user.uid} successfully created. `);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.error(error.message);
      });
  }

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


  return (
    <div className='sign__Up'>
      <form onSubmit={handleSubmit}>
        {/* FIRST NAME  */}
        <label>
          First Name <span>*</span>
          <input type="text" value={firstName} onChange={(e) => 
            setFirstName(e.target.value)} required />
        </label>

        {/* LAST NAME  */}
        <label>
          Last Name <span>*</span>
          <input type="text" value={lastName} onChange={(e) => 
          setLastName(e.target.value)} />
        </label>


        {/* EMAIL  */}
        <label>
          Email <span>*</span>
          <input type="text" value={email} onChange={(e) => 
            setEmail(e.target.value)} required />
        </label>

        {/* PASSWORD  */}
        <label>
          Password <span>*</span>
          <input type="text" value={password} onChange={(e) => 
            setPassword(e.target.value)} required />
        </label>

        {/* CONFIRM PASSWORD  */}
        <label>
          Confirm Password <span>*</span>
          <input type="text" value={confPassword} onChange={(e) => 
            setConfPassword(e.target.value)} required />
        </label>
        
        {passwordError && <PasswordError errorMessage={passwordError} />}

        <div className="password__requirements">
          <h3>Password Requirements</h3>
          <p className={hasLength ? 'green' : 'red'}>Atleast 8 characters long</p>
          <p className={hasUppercase ? 'green' : 'red'}>Must contain one Capital letter</p>
          <p className={hasLowercase ? 'green' : 'red'}>Must contain one Lowercase letter</p>
          <p className={hasSpecialChar ? 'green' : 'red'}>Must contain a special character: !@#$%^&*()</p>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
      <h3>Or Sign in With:</h3>
      <GoogleIcon onClick={handleGoogleSignIn} />
    </div>
  )
}

export default SignUp
