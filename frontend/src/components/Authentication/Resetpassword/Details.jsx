
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import axios from '../../../axios';

const Details = () => {
    const [timer,setTimer]=useState(0)
    const email = useRef()
    const handleClick=async()=>{
    if (timer === 0) {
      
      console.log(email.current.value);
      const fromdata=new FormData();
      fromdata.append('email',email.current.value)
      const response = await axios.post(
        "api/reset-password/",
        fromdata
      );
      setTimer(60)
        }
    }
    useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center px-6'>
      <div className="bg-gray-800 bg-opacity-90 p-10 rounded-3xl shadow-xl w-full max-w-sm flex flex-col">
        <h2 className="text-4xl font-bold text-center text-teal-300 mb-8">
      Email
    </h2>
    <input
      type="Email"
      placeholder="Email"
      ref={email}
      className="w-full px-5 py-3 mb-6 border border-teal-500 rounded-xl placeholder-teal-300 bg-gray-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-300"
    />

         <button
      type="submit"
      disabled={timer > 0}
      className={`w-full py-3 ${timer>0 ? "bg-teal-900 hover:bg-teal-900 cursor-not-allowed"  : "bg-teal-500 hover:bg-teal-600" } transition-colors rounded-xl text-white font-semibold shadow-md`}
      onClick={()=>handleClick()}
    >
      Send
    </button>
    {timer > 0 && (
  <p className="mt-2 text-sm text-gray-400">Please wait {timer}s</p>
)}

      </div>
    </div>
  )
}

export default Details
