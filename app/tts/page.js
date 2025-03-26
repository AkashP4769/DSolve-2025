"use client"
import React, { useState } from 'react'

export default function text_to_speech() {
    const [text,setText] = useState("");
    const speak = () => {
        if (!window.speechSynthesis) {
          alert("Text-to-Speech is not supported in this browser.");
          return;
        }
    
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US"; // Set language
        utterance.rate = 1; // Speed (1 = normal)
        utterance.pitch = 1; // Pitch (1 = normal)
        window.speechSynthesis.speak(utterance);
      };
  return (
    <div>
      <h2>Text to Speech</h2>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter text here..."
      />
      <br />
      <button onClick={speak}>Speak</button>
    </div>
  )
}
