// src/components/routes/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase/supabase";
import { PageLoader } from "../App";
import axios from "axios";
// const ProtectedRoute = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     const checkSession = async () => {
//       const { data } = await supabase.auth.getSession();
//       setSession(data.session);
//       setLoading(false);
//       console.log(data);
//     };

//     checkSession();
//   }, []);

//   if (loading)
//     return (
//       <div>
//         <PageLoader />
//       </div>
//     );
//   if (!session) return <Navigate to="/signin" replace />;

//   return children;
// };

// export default ProtectedRoute;

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const url = import.meta.env.VITE_API_URL;

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
