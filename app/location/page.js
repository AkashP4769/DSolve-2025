"use client";
import { useState } from "react";
import 'dotenv/config';

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
        getNearbyHospitals(position.coords.latitude, position.coords.longitude).then((hospitals) => {
            setHospitals(hospitals);
        });
      },
      (error) => setError(error.message)
    );
  };

  async function getNearbyHospitals(lat, lng) {
    try {
      const response = await fetch(`/api/getHospitals?lat=${lat}&lng=${lng}`);
      const data = (await response.json()).hospitals;
      console.log(data);    
  
      if (data.length) {
        return data.map((hospital) => ({
          name: hospital.name,
          address: hospital.vicinity,
          rating: hospital.rating || "No rating",
          location: hospital.location,
        }));
      } else {
        console.log("No hospitals found.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      return [];
    }
  }
  

  return (
    <div className="text-black bg-white">
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
