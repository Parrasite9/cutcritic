import React from 'react'
import './../CSS/Hero.css'
import Navbar from './Navbar'
import Hero from './Hero'
import Featured from './Featured'
import Ratings from './Ratings'
import Services from './Services'
import Benefits from './Benefits'
import Testimony from './Testimony'


function Home({userId}) {
  return (
    <div className='home'>
      <Navbar userId={userId} />

      <div className="home__elements">
        <Hero />
        <Featured />
        <Ratings />
        <Services />
        <Benefits />
        <Testimony />
      </div>

      
    </div>
  )
}

export default Home
