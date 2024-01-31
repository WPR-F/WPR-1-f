import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";

// PrivateRoute is a higher-order component for handling private routes
const PrivateRoute = ({ element: Element, roles }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const userRole = auth.userRole;


  useEffect(() => {
    // Redirect to login if not authenticated or user role doesn't match
    if (!auth.isLoggedIn || (roles.length > 0 && !userRole.some(role => roles.includes(role)))) {
      console.log("Redirecting to /login");
      console.log(userRole);
      console.log(auth.isLoggedIn);
      navigate("/login");
    }
  }, [navigate, auth.isLoggedIn, roles, userRole]); 


  return auth.isLoggedIn ? <Element /> : null;
};

export default PrivateRoute;