// import React, { useEffect, useState } from 'react'
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../../../Firebase/Firestore';

// function Greeting({userId}) {

//     const [displayName, setDisplayName] = useState('')

//     useEffect(() => {
//         const loginObserver = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setDisplayName(user.displayName)
//             } else {
//                 setDisplayName('')
//             }
//         })
//         return () => {
//             loginObserver()
//         }
//     }, [])

//     console.log('My userId is: ', userId);

//   return (
//     <div className='greeting'>
//       {userId ? `Hello ${userId} test` : 'Hello' }
//     </div>
//   )
// }

// export default Greeting


import React, { useState, useEffect } from 'react';
import { getUserDataFromFirestore } from '../../../Firebase/Firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import '../../../CSS/Dashboard/Paths/Greeting.css'

const Greeting = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const loginObserver = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is logged in, fetch user data
        const userId = user.uid;
        const data = await getUserDataFromFirestore(userId);
        setUserData(data);
      } else {
        // User is not logged in, clear user data
        setUserData(null);
      }
    });

    return () => {
      loginObserver(); // Cleanup the observer
    };
  }, []);

  console.log(userData);

  return (
    <div className='greeting'>
      {userData && userData.professionalFirstName && (
        <h1>Welcome, {userData.professionalFirstName}!</h1>
      )}
      {/* Rest of the component */}
    </div>
  );
};

export default Greeting;
