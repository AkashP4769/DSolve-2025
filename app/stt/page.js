"use client"
import React, { useState } from "react";

export default function SpeechToText() {
  const [text, setText] = useState("");
  const [hospital, setHospital] = useState(null);

  const fetchNearbyHospitals = async (lat, lng) => {
    try {
      const response = await fetch(`/api/getHospitals?lat=${lat}&lng=${lng}`);
      const data = await response.json();

      if (data.hospitals.length > 0) {
        setHospital({
          name: data.hospitals[0].name,
          phone: data.hospitals[0].phone,
          website: data.hospitals[0].website || "Not available",
        });
      } else {
        alert("No nearby hospitals found.");
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const startRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setText(transcript);

      if (transcript.includes("emergency")) {
        alert("Emergency detected! Fetching nearby hospitals...");

        // Get user location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchNearbyHospitals(latitude, longitude);
          },
          (error) => {
            alert("Location access denied. Please enable location.");
            console.error(error);
          }
        );
      }
    };

    recognition.start();
  };

  return (
    <div className="bg-white text-black p-4">
      <h2 className="text-xl font-bold">Speech to Text</h2>
      <button onClick={startRecognition} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
        🎤 Start Speaking
      </button>
      <p className="mt-2">Detected Text: {text}</p>

      {hospital && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold">🚑 Nearest Hospital</h3>
          <p className="font-bold">{hospital.name}</p>
          <p>📞 Phone: <a href={`tel:${hospital.phone}`} className="text-blue-600 underline">{hospital.phone}</a></p>
          <p>🌐 Website: {hospital.website !== "Not available" ? (
            <a href={hospital.website} target="_blank" className="text-blue-600 underline">Visit Website</a>
          ) : (
            "Not available"
          )}</p>
        </div>
      )}
    </div>
  );
}


