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
          First Name
          <input type="text" value={firstName} onChange={(e) => 
            setFirstName(e.target.value)} />
        </label>

        {/* LAST NAME  */}
        <label>
          Last Name
          <input type="text" value={lastName} onChange={(e) => 
          setLastName(e.target.value)} />
        </label>


        {/* EMAIL  */}
        <label>
          Email
          <input type="text" value={email} onChange={(e) => 
            setEmail(e.target.value)} />
        </label>

        {/* PASSWORD  */}
        <label>
          Password
          <input type="text" value={password} onChange={(e) => 
            setPassword(e.target.value)} />
        </label>

        {/* CONFIRM PASSWORD  */}
        <label htmlFor="">
          Confirm Password
          <input type="text" value={confPassword} onChange={(e) => 
            setConfPassword(e.target.value)} />
        </label>

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
