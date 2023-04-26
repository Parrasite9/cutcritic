import React from 'react'
import '../CSS/Featured.css'

function Featured() {
  return (
    <div className='featured'>
      <h2>Featured In</h2>
      <div className="featured__location">
        <img src="/images/featured/entrepreneur.png" alt="" />
        <img src="/images/featured/forbes.png" alt="" />
        <img src="/images/featured/fox.png" alt="" />
        <img src="/images/featured/yahoo.png" alt="" />
      </div>
    </div>
  )
}

export default Featured
