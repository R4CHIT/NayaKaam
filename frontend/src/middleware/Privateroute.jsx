import React, { useContext } from "react";
import { Navigate,useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LoadingEffect from "../components/ui/LoadingEffect";

const Privateroute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LoadingEffect />
      </div>
    );
  }

  if (!localStorage.getItem("accesstoken") && !user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default Privateroute;
