// src/components/routes/ProtectedRoute.jsx

import React from "react";

import { Navigate } from "react-router-dom";

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, val] = c.split("=");
    if (key === name) return decodeURIComponent(val);
  }
  return null;
}

const ProtectedRoute = ({ children }) => {
  const token = getCookie("access_token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  sessionStorage.setItem("gym_id", getCookie("gym_id"));
  return children;
};

export default ProtectedRoute; // ✅ THIS IS IMPORTANT
