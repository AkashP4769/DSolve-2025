"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import LineChart from 'react-linechart';
import { UserAuth } from '../context/AuthContextProvider';
import Link from 'next/link';

export default function Home() {
    const { user } = UserAuth() || {};
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
            <h2>Real-Time Health Monitoring</h2>
            <h1>My First LineChart</h1>
            <div className='flex justify-center items-center'>
                <div>
                    <label>HeartRate</label>
                    <LineChart 
                        width={300}
                        height={150}
                        data={heartData}
                    />
                </div>
                <div>
                    <label>Oxygen Level</label>
                    <LineChart 
                        width={300}
                        height={150}
                        data={oxygenData}
                    />
                </div>
            </div>

            <div className="absolute top-8 right-20">
            <Link href="/profile">
              <div className="p-2 rounded-lg">
                <p>{user?.name}</p>
              </div>
            </Link>
          </div>
            
        </div>
    </div>
  )
}
