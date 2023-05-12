import React from 'react'
import './../../CSS/Home/Testimony.css'

function Testimony() {
  return (
    <div className='testimony'>
      <div className="testimony__text__and__button">
        <h3>Happy Customers</h3>
        <p>Our platform allows customers to easily discover and book talented independent
            barbers and stylists, giving them the freedom to choose the perfect fit for their 
            unique style and preferences.
        </p>
        <button>View All Testimonials</button>
      </div>
      <img src="./images/home/testimony/testimony.png" alt="" />

    </div>
  )
}

export default Testimony

