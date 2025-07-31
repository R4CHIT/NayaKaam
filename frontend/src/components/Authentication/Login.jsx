import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";

import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { Login,error } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    Login(credentials, navigate);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
  <form
    onSubmit={handleSubmit}
    className="bg-gray-800 bg-opacity-90 p-10 rounded-3xl shadow-xl w-full max-w-sm"
  >
    <h2 className="text-4xl font-bold text-center text-teal-300 mb-8">
      Login
    </h2>

    <input
      type="text"
      placeholder="Username & Email"
      value={credentials.username}
      onChange={(e) =>
        setCredentials({ ...credentials, username: e.target.value })
      }
      className="w-full px-5 py-3 mb-6 border border-teal-500 rounded-xl placeholder-teal-300 bg-gray-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-300"
    />

    <input
      type="password"
      placeholder="Password"
      value={credentials.password}
      onChange={(e) =>
        setCredentials({ ...credentials, password: e.target.value })
      }
      className="w-full px-5 py-3 mb-6 border border-teal-500 rounded-xl placeholder-teal-300 bg-gray-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-300"
    />

    {error?.message && (
      <span className="text-red-500 text-sm block mb-5 font-semibold text-center">
        {error.message}
      </span>
    )}

    <button
      type="submit"
      className="w-full py-3 bg-teal-500 hover:bg-teal-600 active:bg-teal-700 transition-colors rounded-xl text-white font-semibold shadow-md"
    >
      Login
    </button>
    <p className="text-center text-slate-300 mt-3 text-sm">
      <Link to="/reset" className="hover:underline hover:text-cyan-400">
        forget password
      </Link>
    </p>
    <p className="text-center text-slate-300 mt-3 text-sm">
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
