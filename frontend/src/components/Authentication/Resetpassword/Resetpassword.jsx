import axios from "../../../axios";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Resetpassword = () => {
  const navigate = useNavigate()
  const {uid,token} = useParams()
  const newpassword = useRef();
  const conformPassword = useRef();
  const [error,setError] = useState()
  const handleClick = async() => {
    if (
      newpassword.current.value == "" ||
      conformPassword.current.value == ""
    ) {
      setError("Enter new Password")
      
      
    } else if (newpassword.current?.value !== conformPassword.current?.value) {
      setError("Password not matched")
      
    }
    else{
      setError('Password Changed Successfully')
      const formdata =new FormData;
      formdata.append("uid",uid)
      formdata.append("token",token)
      formdata.append("newpassword",newpassword.current.value)
      const response = await axios.post('api/password-reset-confirm/',formdata)
      navigate('/login')
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="bg-gray-800 bg-opacity-90 p-10 rounded-3xl shadow-xl w-full max-w-sm flex flex-col">
        <h2 className="text-4xl font-bold text-center text-teal-300 mb-8">
          Reset Password
        </h2>
        <input
          type="password"
          placeholder="Enter password"
          ref={newpassword}
          className="w-full px-5 py-3 mb-6 border border-teal-500 rounded-xl placeholder-teal-300 bg-gray-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-300"
        />

        <input
          type="password"
          placeholder="Enter Conform password"
          ref={conformPassword}
          className="w-full px-5 py-3 mb-2 border border-teal-500 rounded-xl placeholder-teal-300 bg-gray-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-300"
        />
        <p className={` text-[13px] ${error=="Password Changed Successfully" ?"text-green-500": "text-red-600"} pb-2`}>{error}</p>
        <button
          type="submit"
          className={`w-full py-3 hover:bg-teal-900 bg-teal-500  transition-colors rounded-xl text-white font-semibold shadow-md`}
          onClick={() => handleClick()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Resetpassword;
