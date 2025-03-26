"use client";
import React from 'react'
import { useState } from 'react'
import { createData } from '../functions/crud';
import { UserAuth } from '../context/AuthContextProvider';
//inport poppins font


export default function page() {
    const { user } = UserAuth() || {};
    const [page, setPage] = useState(2);
    const [selectedDisability, setSelectedDisability] = useState("");
    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    
    const [medicalCondition, setMedicalCondition] = useState([]);
    const [meds, setMeds] = useState([]);
    const [newCondition, setNewCondition] = useState("");
    const [newMed, setNewMed] = useState("");

    const addCondition = () => {
        if (newCondition.trim() !== "") {
        setMedicalCondition([...medicalCondition, newCondition]);
        setNewCondition(""); // Clear input after adding
        }
    };

    const addMed = () => {
        if (newMed.trim() !== "") {
        setMeds([...meds, newMed]);
        setNewMed(""); // Clear input after adding
        }
    };

    const handleNext = () => {
        console.log('next')
        setPage(page + 1);
    }

    const handlePrev = () => {
        console.log('prev')
        setPage(page - 1);
    }

    const handleConfirm = (e) => {
        console.log('confirm')
        e.preventDefault();
        const data = {name: name,uid:user.uid,age: age,Phone: phone,address: address,Disability: selectedDisability,conditions: medicalCondition,medications: meds}
        console.log(data)
        const collectionName="user-profile-details";
        createData(collectionName,data);
    }

    return (
        <div className='flex flex-col h-[100vh]'>
            <div className='bg-cyan-800 mt-[8vh] h-[92vh] rounded-t-xl'>
                {page == 1 && <div className='page1'>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='py-4 font-bold'>Personal Information</p>
                    </div>
                    <div className='flex flex-col items-start ml-6 '>
                        <label className=''>Name</label>
                        <input type='text' onChange={(e)=>setName(e.target.value)} className='w-[90vw] py-2 mb-2 rounded-md bg-white my-2 text-gray-900 px-2'/>
                    
                        <label className=''>Age</label>
                        <input type='text' onChange={(e)=>setAge(e.target.value)} className='w-[90vw] py-2 mb-2 rounded-md bg-white mt-2 text-gray-900 px-2'/>
                    
                        <label className=''>Phone Number</label>
                        <input type='text' onChange={(e)=>setPhone(e.target.value)} className='w-[90vw] py-2 mb-2 rounded-md bg-white mt-2 text-gray-900 px-2'/>
                    
                        <label className=''>Address</label>
                        <input type='text' onChange={(e)=>setAddress(e.target.value)} className='w-[90vw] py-2 mb-2 rounded-md bg-white mt-2 text-gray-900 px-2'/>
                    </div>
                    
                    <div className='flex flex-col justify-center items-end'>
                        <button onClick={handleNext}>
                            <p className='text-black bg-white px-4 py-2 rounded-lg text-center'>Next</p>
                        </button>
                    </div>
                </div>}
                    
                {page == 2 && <div className='page2 flex flex-col px-4'>
                    <label className="flex flex-col py-2 justify-center items-start">Select Disability</label>
                    <select
                        className=" w-[90vw] py-2 mb-4 rounded-md bg-white text-gray-900 px-2 border border-gray-300"
                        value={selectedDisability}
                        onChange={(e) => setSelectedDisability(e.target.value)}
                    >
                        <option value="">Choose...</option>
                        <option value="eyesight">Eyesight - TTS (Text-to-Speech)</option>
                        <option value="physical">Physical Disability - STT (Speech-to-Text)</option>
                        <option value="cognitive">Cognitive Disability - Pictographs</option>
                    </select>

                    <div className="flex flex-col">
                        {/* Medical Conditions */}
                        <label className="font-medium">Medical Conditions</label>
                        
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Add Condition"
                                value={newCondition}
                                onChange={(e) => setNewCondition(e.target.value)}
                                className="w-full py-2 px-3 border rounded-md bg-white text-black"
                            />
                            <button
                                onClick={addCondition}
                                className=" px-3 py-2 rounded-md bg-white text-black">
                            ✓
                            </button>
                        </div>
                        <ul className="list-disc pl-6 mb-4">
                            {medicalCondition.map((condition, index) => (
                            <li key={index} className="text-gray-700">{condition}</li>
                            ))}
                        </ul>

                        {/* Medications */}
                        <label className="font-medium mt-4 block">Medications</label>
                        <div className="flex items-center gap-2">
                            <input
                            type="text"
                            placeholder="Add Medication"
                            value={newMed}
                            onChange={(e) => setNewMed(e.target.value)}
                            className="w-full py-2 px-3 border rounded-md text-black bg-white"
                            />
                            <button
                            onClick={addMed}
                            className="bg-green-500 text-white px-3 py-2 rounded-md"
                            >
                            ✓
                            </button>
                        </div>
                        <ul className="list-disc pl-6 mb-4">
                            {meds.map((med, index) => (
                            <li key={index} className="text-gray-700">{med}</li>
                            ))}
                        </ul>
                    </div>


                    <div className='flex items-end px-4 justify-end'>
                        <div className='flex flex-col px-2 justify-center mx-4 items-end'>
                            <button onClick={handlePrev}>
                                <p className='text-black bg-white px-4 py-2 rounded-lg text- mr-2d'>Prev</p>
                            </button>
                        </div>
                        
                        <div className='flex flex-col px-2 justify-center items-end'>
                            <button onClick={handleConfirm}>
                                <p className='text-black bg-white px-4 py-2 rounded-lg text-center'>COnfirm</p>
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}
