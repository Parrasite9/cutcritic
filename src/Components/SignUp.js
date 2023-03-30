import React, { useState } from 'react'
import './../CSS/SignUp.css'
import { addUser } from '../Firebase/Firebase'

function SignUp() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      console.log("Passwords do not match");
      return
    }
    try {
      await addUser({ firstName, lastName, email, password, confPassword})
      console.log("User added successfully");
    } catch (err) {
      console.log("Error adding user: ", err);
    }
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
        <label htmlFor="">
          Confirm Password <span>*</span>
          <input type="text" value={confPassword} onChange={(e) => 
            setConfPassword(e.target.value)} required />
        </label>

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
