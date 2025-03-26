"use client"
import React, { useState } from "react";
import { signIn } from "../functions/auth"
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const userData = {
    email,
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signIn(email, password);
    router.push("/home");
  };

  return (
    <div className="flex flex-col bg-cyan-800 p-6 rounded-lg w-96 h-100 justify-center">
      <h1 className="text-white text-center">Login</h1>
      <label className="text-white">Email:</label>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 mb-3 border rounded-full outline-none"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label className="text-white">Password:</label>
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-3 border rounded-full outline-none"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div className="flex justify-center mt-4">
        <button
          className="p-2 rounded-lg hover:bg-red-300 transition-colors w-20 text-white bg-blue-500"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
              
    </div>


  );
}
