// src/components/routes/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase/supabase";
import { PageLoader } from "../App";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
      console.log(data);
    };

    checkSession();
  }, []);

  if (loading)
    return (
      <div>
        <PageLoader />
      </div>
    );
  if (!session) return <Navigate to="/signin" replace />;

  return children;
};

export default ProtectedRoute;
