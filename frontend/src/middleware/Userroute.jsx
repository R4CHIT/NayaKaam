import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const UserRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user && localStorage.getItem("accesstoken")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserRoute;
