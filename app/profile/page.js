"use client"
import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { readData } from '../functions/crud';
import { UserAuth } from '../context/AuthContextProvider';

export default function profile() {
    const { user } = UserAuth() || {};
    const [details, setDetails] = useState({});
    useEffect(() => {
        console.log(user?.uid); 
        const fetchData = async () => {
            const collectionName = "user-profile-details";
            const data = await readData(collectionName, user?.uid); 
            setDetails(data); 
        };
        fetchData();
    }, [user?.uid]);
  return (
    <div className="user-details">
        {details && (
            <div className="post-preview" key={details.id}>
                <h1>Name: {details.name}</h1>
                <p>Age: {details.age}</p> 
                <p>Phone:{details.phone}</p>
                <p>Address:{details.address}</p>
                <p>Conditions:{details.conditions}</p>
                <p>Medications:{details.medications}</p>
            </div>
        )}
    </div>
  )
}
