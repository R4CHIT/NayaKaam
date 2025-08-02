import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LoadingEffect from "../components/ui/LoadingEffect"
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <h2 className="text-xl animate-pulse text-amber-400"><LoadingEffect /></h2>
      </div>
    );
  }
  if (!user || !localStorage.getItem("accesstoken")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
