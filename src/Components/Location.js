import React, { useEffect, useState } from 'react'

function Location() {

    // Declare state variables for longitude, latitude, and services
    const [longitude, setLongitude] = useState(null)
    const [latitude, setLatitude] = useState(null)
    const [services, setServices] = useState([])

    // Create a LocationButton component to prompt the user for location permission
    function LocationButton() {
        const handleClick = () => {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
        }

        return (
            <button onClick={handleClick}>Get Location</button>
        )
    }

    // Use an effect to get the user's geolocation on mount
    useEffect(() => {
        // Check if geolocation is supported by the browser
        if (navigator.gelocation) {
            // Use getCurrentPosition to get the user's geolocation
            navigator.gelocation.getCurrentPosition(
                // Success callback updates the longitude and latitude state variables
                (position) => {
                    setLongitude(position.coords.longitude);
                    setLatitude(position.coords.latitude)
                }, 
                // Error callback logs an error message
                (err) => {
                    console.log('Error getting user location: ', err);
                }
            )
        } else {
            console.log('Geolocation is not supported by this browser');
        }
    }, [])

    // Use an effect to filter service locations within a 25 mile radius of the user's geolocation
    useEffect(() => {
        if (latitude && longitude) {
            fetch('/api/serviceLocations').then((response) => 
                response.json()).then((serviceLocations) => {
                // Filter the service locations within a 25 mile radius of the user's geolocation
                const servicesWithinRadius = serviceLocations.filter((service) => {
                    const distance = google.maps.geometry.spherical.computeDistanceBetween(
                        new google.maps.Lating(latitude, longitude),
                        new google.maps.Lating(service.latitude, service.longitutde)
                    )
                    const miles = disnatce * 0.000621371
                    return miles <= 25
                })
                // Update the services state variable with the filtered service locations
                setServices(servicesWithinRadius)
            })
            .catch((error) => {
                console.log('Error fetching service location: ', err);
            })
        }
    }, [latitude, longitude])

  return (
    <div className='location'>
      {/* Show the user's geolocation or a loading message */}
      {latitude && longitude ? (
        <p>Your location: {latitude}, {longitude}</p>
      ) : (
        <p>Loading your location...</p>
      )}
      <button onClick={LocationButton}>Get Location</button>
    </div>
  )
}

export default Location
