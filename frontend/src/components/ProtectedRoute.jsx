import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const sessionToken = localStorage.getItem("sessionToken");

  if (!sessionToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
