import React from 'react'
import '../CSS/Featured.css'

function Featured() {
  return (
    <div className='featured'>
      <h2>Featured In</h2>
      <div className="featured__location">
        <img src="/images/home/featured/entrepreneur.png" alt="" />
        <img src="/images/home/featured/forbes.png" alt="" />
        <img src="/images/home/featured/fox.png" alt="" />
        <img src="/images/home/featured/yahoo.png" alt="" />
      </div>
    </div>
  )
}

export default Featured
