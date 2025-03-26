"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import LineChart from 'react-linechart';
import { UserAuth } from './context/AuthContextProvider';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col h-[100vh]'>
        <div className='mt-[8vh] h-[92vh] rounded-t-xl justify-center items-center'>
           <h1>Landing Page</h1> 
            
        </div>
    </div>
  )
}
