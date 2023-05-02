import React from 'react'
import './../CSS/Hero.css'
import Navbar from './Navbar'
import Hero from './Hero'
import Featured from './Featured'
import Ratings from './Ratings'
import Services from './Services'
import Benefits from './Benefits'


function Home({userId}) {
  return (
    <div className='home'>
      <Navbar userId={userId} />
      <Hero />
      <Featured />
      <Ratings />
      <Services />
      <Benefits />

      
    </div>
  )
}

export default Home
