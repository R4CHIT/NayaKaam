import React, { useState, useContext, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import InputDetails from "../ui/InputDetails";
import Button from "../ui/Button";
import LoadingEffect from "../ui/LoadingEffect";
import GoogleAuth from "./SocialLogin/GoogleAuth";

function Register() {
  
  const usernameRef =useRef()
  const passwordRef =useRef()
  const emailRef = useRef()
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false)

  const { error, register } = useContext(AuthContext);

  const handleSubmit =async (e) => {
    try {
    setLoading(true)
    const credentials={
    username: usernameRef.current.value,
    email: emailRef.current.value,
    password: passwordRef.current.value,
  }
    e.preventDefault();
    await register(credentials, navigate);
    } catch (error) {
      
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200">

  <form
    
    className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-xl w-full max-w-sm flex flex-col gap-3"
    onSubmit={handleSubmit}
  >
    <h2 className="text-4xl font-bold text-center text-orange-500 mb-8">
      Register
    </h2>

    <div className="">
      <InputDetails
        type="text"
        placeholder="Username"
        title={"Username"}
        ref={usernameRef}
      />
    </div>

    <div className="">
      <InputDetails
        title={"Email"}
        type="text"
        placeholder="Email"
        ref={emailRef}
      />
    </div>

    <div className="">
      <InputDetails
        title={"Password"}
        type="password"
        placeholder="Password"
        ref={passwordRef}
      />
    </div>

    {error?.message && (
      <span className="text-red-500 text-sm block font-semibold text-center">
        {error.message}
      </span>
    )}

    <Button
      title={loading ?(<LoadingEffect />) : "Register"}
      type={"submit"}
    />
    <GoogleAuth task={'register'}/>


    <p className="text-center text-slate-700 text-sm">
      Already have an account?{" "}
      <Link to="/login" className="hover:underline hover:text-cyan-400">
        Login
      </Link>
    </p>
  </form>
</div>

  );
}

export default Register;
