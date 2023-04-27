import { Rating } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import './../CSS/Ratings.css'

function Ratings() {

    const [value, setValue] = useState(4.7)

  return (
    <div className='ratings'>
      <div className="ratings__container">
        <div className="ratings__grid1">
            <h1>{value}</h1>
            <Rating name='half-rating-read' value={value} precision={0.1} readOnly />
            <h5>2,384 Ratings</h5>
            <h5>Google Reviews</h5>
        </div>


        <div className="ratings__grid2">
            <h1>A+</h1>
            <Rating name='half-rating-read' value={value} precision={0.1} readOnly />
            <h5>125 Reviews</h5>
            <h5>BBB Rating</h5>
        </div>

        <div className="trusted__by">
            <h1>Trusted by numerous Grooming enthusiasts</h1>
            <h2>Jessica Simon</h2>
            <p>I love how easy it is to find and book appointments with the best barbers and stylist through this platform!</p>
        </div>
      </div>
    </div>
  )
}

export default Ratings
