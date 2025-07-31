import React, { createContext, useState, useEffect } from "react";
import axios from "../axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const res = await axios.get("/api/auth/user/");
        setUser(res.data);        
      } catch (err) {
        Logout();
      }
    }
    setLoading(false);
  };

  checkAuth();
}, []);

  const Login = async (credentials) => {
  try {
    if (credentials.username === "" || credentials.password === "") {
      setError({ message: "Please fill in all fields" });
      return;
    }

    const response = await axios.post("/api/auth/login/", credentials);
    const { access, refresh } = response.data;

    localStorage.setItem("accesstoken", access);
    localStorage.setItem("refreshtoken", refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    setUser(credentials.username);
    setError(null);
    navigate("/");
  } catch (err) {
    setError({ message: "Invalid credentials" });
  } finally {
    setLoading(false);
  }
};

  
const register = async (credentials,navigate) => {
    try {
      if (credentials.username === "" || credentials.password === "" || credentials.email === "") {
      setError({ message: "Please fill in all fields" });
      return;
    }
      const response = await axios.post(
        "/api/auth/register/",
        credentials,
      );
      navigate("/login");
      setError({message:"Register Succesfull"})
    } catch (error) {
      setError({ message: "Invalid credentials" });
    } finally {
      setLoading(false);
      
    }
  };
  

  const Logout = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  

  return (
    <AuthContext.Provider value={{ user,loading, Login, Logout , register,error}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
