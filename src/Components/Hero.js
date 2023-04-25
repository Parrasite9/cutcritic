import React from 'react'
import './../CSS/Hero.css'

function Hero() {
  return (
    <div className='hero'>
      <div className="hero__text">
        <h1>Find Your Perfect Barber or Stylist</h1>
        <p>Book appointments with independent barbers and stylists in your area. Our platform connects you with the best professionals for your unique needs.</p>
      </div>

      <div className="btn__container">
        <button>View all Services</button>
      </div>

      <img src="/images/heroImg.png" alt="" />
    </div>
  )
}

export default Hero
