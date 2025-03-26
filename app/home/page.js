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
          setheartData((prevData) => {
            const newPoint = {
              x: prevData[0].points.length + 1, // Increment X correctly
              y: Math.floor(Math.random() * (120 - 60) + 60),
            };
      
            return [{
              color: "steelblue",
              points: [...prevData[0].points, newPoint], // Keep last 10 points
            }];
          });
      
          setoxygenData((prevData) => {
            const newOxygenPoint = {
              x: prevData[0].points.length + 1, // Ensure X stays sequential
              y: Math.floor(Math.random() * (100 - 90) + 90),
            };
      
            return [{
              color: "steelblue",
              points: [...prevData[0].points, newOxygenPoint], // Keep last 10 points
            }];
          });
        }, 1000);
      
        return () => clearInterval(interval);
      }, []);

      console.log(user?.name);

  console.log(heartData.points);
  return (
    
    <div className='flex flex-col h-[100vh] text-black'>
        <div className='mt-[8vh] h-[92vh] flex flex-col rounded-t-xl justify-center items-center'>
            <h2 className='text-black'>Real-Time Health Monitoring</h2>
            <div className='flex flex-col sm:flex-row justify-center items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <LineChart id="heartRate" 
                        width={300}
                        height={300}
                        data={heartData}
                    />
                    <label className='text-black font-bold'>HeartRate</label>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <LineChart 
                        id="oxygenLevel"
                        width={300}
                        height={300}
                        data={oxygenData}
                    />
                    <label className='text-black font-bold'>Oxygen Level</label>
                </div>
                
            </div>
            <div className='flex flex-col justify-center items-center'>
              <p className=' font-semibold'>Your Health Status</p>
              <p>{oxygenData[0].points["y"] < 150 ? "Low blood pressure" : "Normal"}</p>
            </div>


            <div className="absolute top-8 right-20">
            <Link href="/profile">
              <div className="p-2 text-black rounded-lg">
                <p>{user?.name}</p>
              </div>
            </Link>
          </div>

          <div className="flex justify-center items-center bg-gray-100">
            <a href={`tel:${phoneNumber}`}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition">
              📞 Call Now
            </a>
          </div>
        </div>
    </div>
  )
}
