import React, { useState, useEffect } from 'react';
import { fetchBarbersAndStylists } from '../Firebase/Firestore';

const GeoLocation = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [nearbyProviders, setNearbyProviders] = useState([]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 3958.8; // Radius of the Earth in miles
  
    // Convert latitude and longitude to radians
    const latRad1 = toRad(lat1);
    const lonRad1 = toRad(lon1);
    const latRad2 = toRad(lat2);
    const lonRad2 = toRad(lon2);
  
    // Calculate the differences in latitude and longitude
    const latDiff = latRad2 - latRad1;
    const lonDiff = lonRad2 - lonRad1;
  
    // Apply the Haversine formula
    const a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
              Math.cos(latRad1) * Math.cos(latRad2) *
              Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    // Calculate the distance
    const distance = earthRadius * c;
    
    return distance;
  };
  
  const toRad = (value) => {
    return value * Math.PI / 180;
  };
  

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setLat(userLat);
          setLng(userLng);
        },
        () => {
          setStatus('Unable to retrieve your location');
        }
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const barbersAndStylists = await fetchBarbersAndStylists();
      setNearbyProviders(barbersAndStylists);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (lat && lng) {
      const nearbyBarbersAndStylists = nearbyProviders.filter((provider) => {
        const providerLat = provider.latitude;
        const providerLng = provider.longitude;

        const distance = calculateDistance(lat, lng, providerLat, providerLng);
        return distance <= 20; // Adjust the radius value as needed
      });

      setNearbyProviders(nearbyBarbersAndStylists);
    }
  }, [lat, lng]);

  return (
    <div className="App">
      <button onClick={getLocation}>Get Location</button>
      <h1>Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
      {/* Display nearby providers */}
      <h2>Nearby Providers</h2>
      {nearbyProviders.map((provider) => (
        <div key={provider.id}>
          <p>{provider.name}</p>
          {/* Display other provider information */}
        </div>
      ))}
    </div>
  );
};

export default GeoLocation;
