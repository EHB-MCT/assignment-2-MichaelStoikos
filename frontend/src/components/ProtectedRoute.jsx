import React from "react";
import { Navigate } from "react-router-dom";

/**
 * A higher-order component that protects routes and ensures only authenticated users can access them.
 * 
 * @function ProtectedRoute
 * @param {Object} props - The props passed to the component
 * @param {JSX.Element} props.children - The components to render if the user is authenticated
 * @returns {JSX.Element} The child components if the user is authenticated, or a redirect to the login page if not
 */
const ProtectedRoute = ({ children }) => {
  // Retrieve the session token from localStorage
  const sessionToken = localStorage.getItem("sessionToken");

  /**
   * If the session token is not found (user is not authenticated),
   * redirect the user to the login page.
   */
  if (!sessionToken) {
    return <Navigate to="/" />;
  }

   /**
   * If the session token exists (user is authenticated),
   * render the child components passed to the `ProtectedRoute`.
   */
  return children;
};

export default ProtectedRoute;
