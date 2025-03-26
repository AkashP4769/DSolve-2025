"use client"
import React, { useState } from 'react'

export default function speech_to_text() {
    const [text,setText] = useState('');
    const startRecognition = () => {
        const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Set language
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };

    recognition.start();
      };
    
  return (
    <div>
      <h2>Speech to Text</h2>
      <button onClick={startRecognition}>Start Speaking</button>
      <p>{text}</p>
    </div>
  )
}
