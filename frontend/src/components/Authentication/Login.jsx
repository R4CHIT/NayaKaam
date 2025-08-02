import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";

import { useNavigate, Link } from "react-router-dom";
import InputDetails from "../ui/InputDetails";
import { useRef } from "react";
import Button from "../ui/Button";
import LoadingEffect from "../ui/LoadingEffect";

function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);

  const { Login, error } = useContext(AuthContext);

  const handleSubmit = async(e) => {
    try {
      setLoading(true);
      const credentials = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      e.preventDefault();
      await Login(credentials, navigate);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <form className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-xl w-full max-w-sm flex flex-col gap-3">
        <h2 className="text-4xl font-bold text-center text-orange-500 ">
          Login
        </h2>

        <InputDetails
          title={"Username"}
          type="text"
          placeholder={"Username & Email"}
          ref={usernameRef}
        />

        <InputDetails
          title={"Password"}
          type="text"
          placeholder={"Enter your Password"}
          ref={passwordRef}
        />

        {error?.message && (
          <span className="text-red-500 text-sm block font-semibold text-center">
            {error.message}
          </span>
        )}

        <Button title={loading ? <LoadingEffect /> : "Login"} type="submit" onClick={handleSubmit}>
          Login
        </Button>
        <p className="text-center text-slate-700 text-sm">
          <Link to="/reset" className="hover:underline hover:text-cyan-400">
            forget password
          </Link>
        </p>
        <p className="text-center text-slate-700 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="hover:underline hover:text-cyan-400">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
