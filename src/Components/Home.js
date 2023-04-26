import React from 'react'
import './../CSS/Hero.css'
import Navbar from './Navbar'
import Hero from './Hero'
import Featured from './Featured'


function Home({userId}) {
  return (
    <div className='home'>
      <Navbar userId={userId} />
      <Hero />
      <Featured />

      
    </div>
  )
}

export default Home
