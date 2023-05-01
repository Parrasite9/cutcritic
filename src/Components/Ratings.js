import { Rating } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import './../CSS/Ratings.css'

function Ratings() {

    const [value, setValue] = useState(4.7)

  return (
    <div className='ratings'>
      <div className="ratings__container">
        {/* RATINGS ARE HARD CODED, THIS NEEDS TO BECOME DYNAMIC AT SOME POINT AND POSSIBLY PULLED FROM GOOGLE ITSELF.  */}
        <div className="ratings__grid1">
            <h1><strong>{value}</strong></h1>
            <Rating name='half-rating-read' value={value} precision={0.1} size="small" readOnly />
            <h5>2,384 Ratings</h5>
            <h5>Google Reviews</h5>
        </div>


        <div className="ratings__grid2">
            <h1><strong>A+</strong></h1>
            <Rating name='half-rating-read' value={value} precision={0.1} size="small" readOnly />
            <h5>125 Reviews</h5>
            <h5>BBB Rating</h5>
        </div>

        <div className="trusted__by">
            <h2>Trusted by numerous Grooming enthusiasts</h2>
            <h3>Jessica Simon</h3>
            <p>I love how easy it is to find and book appointments with the best barbers and stylist through this platform!</p>
        </div>
      </div>
    </div>
  )
}

export default Ratings
