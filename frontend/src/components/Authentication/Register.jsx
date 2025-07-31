import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { error, register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(credentials, navigate);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
  <form
    onSubmit={handleSubmit}
    className="bg-gray-800 bg-opacity-90 p-10 rounded-3xl shadow-xl w-full max-w-sm"
  >
    <h2 className="text-4xl font-bold text-center text-teal-300 mb-8">
      Register
    </h2>

    <div className="mb-6">
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="w-full px-5 py-3 border border-teal-500 rounded-xl placeholder-teal-300 bg-gray-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-300"
      />
    </div>

    <div className="mb-6">
      <input
        type="text"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        className="w-full px-5 py-3 border border-teal-500 rounded-xl placeholder-teal-300 bg-gray-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-300"
      />
    </div>

    <div className="mb-6">
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="w-full px-5 py-3 border border-teal-500 rounded-xl placeholder-teal-300 bg-gray-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-300"
      />
    </div>

    {error?.message && (
      <span className="text-red-500 text-sm block mb-5 font-semibold text-center">
        {error.message}
      </span>
    )}

    <button
      type="submit"
      className="w-full py-3 bg-teal-500 hover:bg-teal-600 active:bg-teal-700 transition-colors rounded-xl text-white font-semibold shadow-md"
    >
      Register
    </button>

    <p className="text-center text-slate-300 mt-6 text-sm">
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
