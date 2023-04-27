import React from 'react'
import './../CSS/Hero.css'
import Navbar from './Navbar'
import Hero from './Hero'
import Featured from './Featured'
import Ratings from './Ratings'


function Home({userId}) {
  return (
    <div className='home'>
      <Navbar userId={userId} />
      <Hero />
      <Featured />
      <Ratings />

      
    </div>
  )
}

export default Home
