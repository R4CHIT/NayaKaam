import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const GoogleAuth = ({task}) => {
  const {googleLogin} = useContext(AuthContext)
  
  const navigate = useNavigate()
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      
      googleLogin(credentialResponse,navigate,task)
    } catch (error) {
      
    }
  };
  return (
    <div className="flex justify-center gap-4 w-full">
      
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.log("Google Login Failed")}
        useOneTap
      />
    </div>
  );
};

export default GoogleAuth;