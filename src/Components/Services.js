import React from 'react'
import './../CSS/Services.css'

function Services() {
  return (
    <div className='services'>
      <div className="services__header">
        <h3>Our Services</h3>
        <button>View All Services</button>
      </div>

      <div className="services__offer">
        <div className="services__offer1">
            <img src="./images/home/services/nailtech.png" alt="" />
            <h3>Nail Guru on Demand</h3>
            <p>Get your nails done in style by a professional nail technician, with a wide range of colors and designs to choose from!</p>
            <a href="#">Read More</a>
        </div>
        <div className="services__offer2">
            <img src="./images/home/services/barber1.png" alt="" />
            <h3>Barber Bookings Made Easy</h3>
            <p>Looking for a fun makeover? Come to our beauty salon! We Offer Haircuts, color, styling, makeup and more!</p>
            <a href="#">Read More</a>
        </div>
        <div className="services__offer3">
            <img src="./images/home/services/barber2.png" alt="" />
            <h3>Book a barber, Look Sharp!</h3>
            <p>Get a fresh new look with our Barber Cut Service, where our experienced barbers will give you a personalized and stylish haircut.</p>
            <a href="#">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default Services
