"use client";
import { useState } from "react";
import 'dotenv/config';
import CORS from 'cors';

export default function get_location() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [hospitals, setHospitals] = useState([]);

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
        getLocation(position.coords.latitude, position.coords.longitude);
      },
      (error) => setError(error.message)
    );
  };

  async function getNearbyHospitals(lat, lng) {
      const API_KEY = process.env.NEXT_PUBLIC_GMAPS_API;
      const radius = 5000; // Search radius in meters (5km)
      const type = "hospital";
      console.log(API_KEY);

      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
            return data.results.map(hospital => ({
                name: hospital.name,
                address: hospital.vicinity,
                rating: hospital.rating || "No rating",
                location: hospital.geometry.location
            }));
        } else {
            console.log("No hospitals found.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching hospitals:", error);
    }
  }

  return (
    <div className="text-black">
      <h2>Get Current Location</h2>
      <button onClick={getLocation}>Find My Location</button>
      {location && <p>Latitude: {location.lat}, Longitude: {location.lng}</p>}
      {error && <p>Error: {error}</p>}

      {/*<button onClick={() => getNearbyHospitals(location.lat, location.lng)}>get hostp</button>*/}
      {location && hospitals && <div>
        <h2>Nearby Hospitals</h2>
        <ul>
          {hospitals.map((hospital, index) => (
            <li key={index}>
              <h3>{hospital.name}</h3>
              <p>Address: {hospital.address}</p>
              <p>Rating: {hospital.rating}</p>
            </li>
          ))}
        </ul>  
      </div>}
    </div>
  )
}
