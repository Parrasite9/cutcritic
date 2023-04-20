import React from 'react'
import './../CSS/Hero.css'
import Navbar from './Navbar'
import Hero from './Hero'


function Home({userId}) {
  return (
    <div className='home'>
      <Navbar userId={userId} />
      <Hero />

      
    </div>
  )
}

export default Home
