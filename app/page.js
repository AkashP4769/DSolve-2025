"use client"
import React from 'react'
import { motion } from "framer-motion";


export default function Home() {
  return (

    <div className="bg-fuchsia-900"> 
      <div className="bg-white">
          <div className="flex h-screen items-center justify-center">
        {/* Logo Container */}
        <div className="relative w-[250px] h-[274px] flex items-center justify-center">
          {/* Blue Circle */}
          <div className="w-[200px] h-[200px] bg-fuchsia-900 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">ONE CLICK</span>
          </div>

          {/* Animated Click Icon */}
          <motion.img
              src="/images/pointer.png" // Replace with your actual icon path
              alt="Click Icon"
              initial={{ y: 300, opacity: 0 }} // Starts from below the screen
              animate={{ y: 20, opacity: 1 }} // Moves up near the circle
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
              className="absolute w-[60px] h-[60px]"
            />

            {/* Click Bounce Effect */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 0.9 }}
              transition={{
                duration: 0.2,
                delay: 1.5, // Wait until cursor reaches the circle
                repeat: 2, // Bounces twice
                repeatType: "reverse",
              }}
              className="absolute w-[200px] h-[200px] bg-transparent rounded-full"
            />
        </div>
      </div>
      </div>
    </div>
    
    
       
  )
}
