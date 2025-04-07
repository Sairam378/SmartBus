import React, { useState, useEffect } from 'react';

const DistanceFromCurrentLocation = () => {
  const [city2, setCity2] = useState('');
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);

  const palasaCoordinates = { lat: 18.77, lng: 84.30 }; 

  useEffect(() => {
    // Get the user's current location using the browser's Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationLoading(false);
        },
        (error) => {
          setLocationError(error.message);
          setLocationLoading(false);
          setCurrentLocation(palasaCoordinates); // Fallback to Palasa if geolocation fails
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
      setLocationLoading(false);
      setCurrentLocation(palasaCoordinates); // Fallback to Palasa if no support
    }
  }, []); // Empty dependency array means this runs once after the initial render

  const handleCity2Change = (event) => {
    setCity2(event.target.value);
  };

  const calculateDistance = async () => {
    if (!city2) {
      setError('Please enter the second city name.');
      setDistance(null);
      return;
    }

    setError(null);
    setDistance(null);
    setLoading(true);

    try {
      // Geocoding function to get coordinates from city name
      const geocode = async (city) => {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            city
          )}&key=YOUR_GOOGLE_MAPS_API_KEY` // Replace with your API key
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return data.results[0].geometry.location;
        } else {
          throw new Error(`Could not geocode city: ${city}`);
        }
      };

      if (!currentLocation) {
        throw new Error('Could not determine current location.');
      }

      const location2 = await geocode(city2);

      // Function to calculate distance in kilometers using Haversine formula
      const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
      };

      const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);
      };

      const calculatedDistance = calculateHaversineDistance(
        currentLocation.lat,
        currentLocation.lng,
        location2.lat,
        location2.lng
      );

      setDistance(calculatedDistance.toFixed(2));
    } catch (err) {
      setError(err.message);
      setDistance(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Distance from Current Location</h2>
      {locationLoading ? (
        <p>Getting current location...</p>
      ) : locationError ? (
        <p style={{ color: 'red' }}>Error getting location: {locationError}</p>
      ) : currentLocation ? (
        <div>
          <p>Current Location (approximate): Latitude: {currentLocation.lat.toFixed(4)}, Longitude: {currentLocation.lng.toFixed(4)}</p>
          <div>
            <label htmlFor="city2">Enter Second City:</label>
            <input
              type="text"
              id="city2"
              value={city2}
              onChange={handleCity2Change}
            />
          </div>
          <button onClick={calculateDistance} disabled={loading}>
            {loading ? 'Calculating...' : 'Calculate Distance'}
          </button>

          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {distance !== null && (
            <p>
              Distance between current location and {city2}: {distance} km
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default DistanceFromCurrentLocation;