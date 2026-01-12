import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import InputDetails from "../ui/InputDetails";
import { useRef } from "react";
import Button from "../ui/Button";
import LoadingEffect from "../ui/LoadingEffect";
import GoogleAuth from "./SocialLogin/GoogleAuth";


function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);

  const { login, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const credentials = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      await login(credentials, navigate);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200">

    
    <form
      className="relative bg-white/50 p-10 rounded-3xl shadow-xl border border-slate-200 w-full max-w-sm flex flex-col gap-3 z-10"
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl font-bold text-center text-orange-500">
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
        <span className="text-red-600 text-sm block font-semibold text-center bg-red-50 px-3 py-2 rounded-lg border border-red-200">
          {error.message}
        </span>
      )}

      <Button title={loading ? <LoadingEffect /> : "Login"} type={"submit"}>
        Login
      </Button>
      <GoogleAuth task={'login'}/>
      <p className="text-center text-slate-600 text-sm">
        <Link
          to="/auth/reset"
          className="hover:underline hover:text-blue-600 transition-colors duration-200"
        >
          forget password
        </Link>
      </p>
      <p className="text-center text-slate-600 text-sm">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="hover:underline hover:text-blue-600 transition-colors duration-200"
        >
          Register
        </Link>
      </p>
    </form>
  </div>
);

}

export default Login;
