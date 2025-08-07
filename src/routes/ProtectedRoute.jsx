// src/components/routes/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PageLoader } from "../App";
import axios from "axios";
import { useLogoutSession } from "../hooks/logout/useLogout";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const url = import.meta.env.VITE_API_URL;
  const { mutateAsync: logoutSession, isLoading } = useLogoutSession();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication...");

        const res = await axios.get(`${url}/protected`, {
          withCredentials: true,
        });

        setAuthenticated(true);
      } catch (err) {
        setAuthenticated(false);
        try {
          const sessionId = localStorage.getItem("session_id");
          if (!sessionId) {
            console.error("No session ID found in sessionStorage");
            return;
          }
          await logoutSession(sessionId);

          localStorage.clear();
        } catch (err) {
          console.log(err);
        }

        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <PageLoader />;
  if (!authenticated) return <Navigate to="/signin" replace />;

  return children;
};

export default ProtectedRoute;
