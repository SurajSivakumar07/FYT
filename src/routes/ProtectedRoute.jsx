// src/components/routes/ProtectedRoute.jsx

import React from "react";

import { Navigate } from "react-router-dom";
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

const ProtectedRoute = ({ children }) => {
  const token = getCookie("access_token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute; // ✅ THIS IS IMPORTANT
