import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../Firebase/Firestore';


function Greeting({userId}) {

    const [displayName, setDisplayName] = useState('')

    useEffect(() => {
        const loginObserver = onAuthStateChanged(auth, (user) => {
            if (user) {
                setDisplayName(user.displayName)
            } else {
                setDisplayName('')
            }
        })
        return () => {
            loginObserver()
        }
    }, [])

    console.log('My userId is: ', userId);

  return (
    <div className='greeting'>
      {userId ? `Hello ${userId} test` : 'Hello' }
    </div>
  )
}

export default Greeting
