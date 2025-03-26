"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import LineChart from 'react-linechart';
import { UserAuth } from '../context/AuthContextProvider';
import Link from 'next/link';

export default function Home() {
    const { user } = UserAuth() || {};
    const phoneNumber = "+919037714678"; // Change this to the desired number
    const [heartData, setheartData] = useState([
        {
          color: "steelblue",
          points: [],
        },
      ]);

      const [oxygenData, setoxygenData] = useState([
        {
          color: "steelblue",
          points: [],
        },
      ]);

      useEffect(() => {
        const interval = setInterval(() => {
          const newPoint = {
            x: heartData[0].points.length + 1,
            y: Math.floor(Math.random() * (120 - 60) + 60),
            
          };
        
          const newOxygenPoint = {
            x: oxygenData[0].points.length + 1,
            y: Math.floor(Math.random() * (100 - 90) + 90),
          };
          
          setheartData((prevData) => [{
            color: "steelblue",
            points: [...prevData[0].points.slice(-10), newPoint],
          }]);

          setoxygenData((prevData) => [{
            color: "steelblue",
            points: [...prevData[0].points.slice(-10), newOxygenPoint],
          }]);
        }, 1000);
    
        return () => clearInterval(interval);
      }, [heartData]);

      console.log(user?.name);
  return (
    <div className='flex flex-col h-[100vh]'>
        <div className='mt-[8vh] h-[92vh] rounded-t-xl justify-center items-center'>
            <h2 className='text-black'>Real-Time Health Monitoring</h2>
            <h1 className='text-black'>My First LineChart</h1>
            <div className='flex justify-center items-center'>
                <div>
                    <label className='text-black'>HeartRate</label>
                    <LineChart id="heartRate" 
                        width={300}
                        height={150}
                        data={heartData}
                    />
                </div>
                <div>
                    <label className='text-black'>Oxygen Level</label>
                    <LineChart 
                        id="oxygenLevel"
                        width={300}
                        height={150}
                        data={oxygenData}
                    />
                </div>
            </div>

            <div className="absolute top-8 right-20">
            <Link href="/profile">
              <div className="p-2 text-black rounded-lg">
                <p>{user?.name}</p>
              </div>
            </Link>
          </div>

          <div className="flex justify-center items-center h-screen bg-gray-100">
            <a href={`tel:${phoneNumber}`}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition">
              📞 Call Now
            </a>
          </div>
        </div>
    </div>
  )
}
