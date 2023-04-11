import React from 'react'
import './../CSS/Hero.css'
import Navbar from './Navbar'

function Home({userId}) {
  return (
    <div className='home'>
      <Navbar userId={userId} />
    </div>
  )
}

export default Home
