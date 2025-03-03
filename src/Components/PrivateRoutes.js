import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const auth = useSelector((state) => state.auth);
  console.log(auth,"auth")
  return auth.isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;