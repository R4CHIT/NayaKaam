import React,{useContext} from "react";
import { Navigate } from "react-router-dom";
import AuthContext  from "../context/AuthContext";

const Userroute = ({ children }) => {
  const {user} = useContext(AuthContext);

  if (localStorage.getItem("accesstoken") && user) {
    return <Navigate to="/" />;
  }  
  return children;
  
}
export default Userroute;