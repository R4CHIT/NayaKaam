import React, { createContext, useState, useEffect,useCallback } from "react";
import axios from "../axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile,setProfile] = useState(null)
  const [successMessage,setSuccessMessage] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accesstoken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const res = await axios.get("/api/auth/user/");
          setUser(res.data);
          if (res.data.roles=='provider') {
            const profile= await axios.get("api/get/userprofile/")
          setProfile(profile.data)
          }
        } catch (err) {
          
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials, navigate) => {
    setLoading(true);
    try {
      if (!credentials.username || !credentials.password) {
        setError({ message: "Please fill in all fields" });
        return;
      }

      const response = await axios.post("/api/auth/login/", credentials);
      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem("accesstoken", access);
        localStorage.setItem("refreshtoken", refresh);
        axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

        setError(null);
        setUser(response.data.user);
        setProfile(response.data.profile)
        navigate("/");
      }
    } catch (err) {
      setError({ message: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials, navigate) => {
    try {
      if (
        credentials.username === "" ||
        credentials.password === "" ||
        credentials.email === ""
      ) {
        setError({ message: "Please fill in all fields" });
        return;
      }
      const response = await axios.post("/api/auth/register/", credentials);
      navigate("/");
      setError({ message: "Register Succesfull" });
    } catch (error) {
      setError({ message: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  const Logout = (navigate) => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    if(navigate){navigate('/auth/login')}
  };

const googleLogin = useCallback(async (credentialResponse, navigate,task) => {
    setLoading(true);
    setSuccessMessage("");
    try {
      const token = credentialResponse.credential;
      if (!token) {
        setError({ message: "Google credential missing" });
        setLoading(false);
        return;
      }
      let res;
      if(task=="login"){
      res = await axios.post("/api/auth/login-google/", { access_token: token });
      }else
      res = await axios.post("/api/auth/register-google/", { access_token: token });
      const { access, refresh } = res.data.token;

      localStorage.setItem("accesstoken", access);
      localStorage.setItem("refreshtoken", refresh);
      
      setUser(res.data.user);
      setError(null);
      setSuccessMessage("Google login successful");

      if (navigate) navigate("/");
    } catch (err) {
      setError({ message: "Google login failed" });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, Logout, register, error ,profile,googleLogin}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
