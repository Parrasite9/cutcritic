import React from 'react'
import './../CSS/Benefits.css'
import StarsIcon from '@mui/icons-material/Stars';

function Benefits() {
  return (
    <div className='benefits'>
        <div className="hr__text">
            <hr />
            <span>Features & Benefits</span>
        </div>

        <div className="app__features">
            <h3>Features</h3>
            <div className="fiat feature__icon__and__text1">
                <StarsIcon />
                <p>Easy booking & appointment scheduling</p>
            </div>
            <div className="fiat feature__icon__and__text2">
                <StarsIcon />
                <p>Access to a wide network of independent barbers and stylist</p>
            </div>
            <div className="fiat feature__icon__and__text3">
                <StarsIcon />
                <p>User-friendly app for both customers and barber/stylists</p>
            </div>
            <div className="fiat feature__icon__and__text4">
                <StarsIcon />
                <p>Ability to leave and view reviews and ratings</p>
            </div>
            <div className="fiat feature__icon__and__text5">
                <StarsIcon />
                <p>Personalized recommendations for barber/stylists based on customer preferences and location</p>
            </div>
        </div>

        <div className="app__benefits">
            <h3>Benefits</h3>
            <div className="biat benefits__icon__and__text1">
                <StarsIcon />
                <p>Convenient booking process for customers</p>
            </div>
            <div className="biat benefits__icon__and__text2">
                <StarsIcon />
                <p>Access to a wide range of independent barbers and stylist</p>
            </div>
            <div className="biat benefits__icon__and__text3">
                <StarsIcon />
                <p>Increased earning potential for barbers and stylists</p>
            </div>
            <div className="biat benefits__icon__and__text4">
                <StarsIcon />
                <p>Easy appointment management for barbers and stylist</p>
            </div>
            <div className="biat benefits__icon__and__text5">
                <StarsIcon />
                <p>Improved client base for barbers and stylists</p>
            </div>
        </div>

        <img src="/images/benefits/benefits.png" alt="" />
      
    </div>
  )
}

export default Benefits
