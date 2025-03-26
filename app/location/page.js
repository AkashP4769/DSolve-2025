"use client";
import { useState } from "react";

export default function get_location() {
    const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => setError(error.message)
    );
  };
  return (
    <div>
      <h2>Get Current Location</h2>
      <button onClick={getLocation}>Find My Location</button>
      {location && <p>Latitude: {location.lat}, Longitude: {location.lng}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  )
}
