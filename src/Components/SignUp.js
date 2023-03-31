import React, { useEffect, useState } from 'react'
import './../CSS/SignUp.css'
import { addUser } from '../Firebase/Firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


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

  useEffect(() => {
    if (password.length >= 8) {
      setHasLength(true)
    } else {
      setHasLength(false)
    }
  }, [password]);

  useEffect(() => {
    const uppercaseRegex = /[A-Z]/
    if (uppercaseRegex.test(password)) {
      setHasUppercase(true)
    } else {
      setHasUppercase(false)
    }
  }, [password]);

  useEffect(() => {
    const lowercaseRegex = /[a-z]/
    if (lowercaseRegex.test(password)) {
      setHasLowercase(true)
    } else {
      setHasLowercase(false)
    }
  }, [password]);

  useEffect(() => {
    const specialCharRegex = /[!@#$%^&*()]/
    if (specialCharRegex.test(password)) {
      setHasSpecialChar(true)
    } else {
      setHasSpecialChar(false)
    }
  }, [password]);


  const handlePasswordChange = (e) => {
    setPassword(e.target.value)

    // CHECKS IF PASSWORD MEETS LENGTH REQUIREMENT 
    if (e.target.value.length >= 8) {
      setHasLength(true)
    } else {
      setHasLength(false)
    }

    // CHECKS IF PASSWORD CONTAINS UPPERCASE LETTER 
    const uppercaseRegex = /[A-Z]/
    if (uppercaseRegex.test(e.target.value)) {
      setHasUppercase(true)
    } else {
      setHasUppercase(false)
    }

    // CHECKS IF PASSWORD CONTISN LOWERCASE LETTER 
    const lowercaseRegex = /[a-z]/
    if (lowercaseRegex.test(e.target.value)) {
      setHasLowercase(true)
    } else {
      setHasLowercase(false)
    }

    // CHECKS IF PASSWORD CONTAINS SPECIAL CHARACTER 
    const specialCharRegex = /[!@#$%^&*()]/
    if (specialCharRegex.test(e.target.value)) {
      setHasSpecialChar(true)
    } else {
      setHasSpecialChar(false)
    }


  }

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
    </div>
  )
}

export default SignUp
