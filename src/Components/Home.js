import React from 'react'
import './../CSS/Hero.css'
import Navbar from './Navbar'
import Hero from './Hero'
import Featured from './Featured'
import Ratings from './Ratings'
import Services from './Services'


function Home({userId}) {
  return (
    <div className='home'>
      <Navbar userId={userId} />
      <Hero />
      <Featured />
      <Ratings />
      <Services />

      
    </div>
  )
}

export default Home
