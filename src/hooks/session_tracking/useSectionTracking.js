import { useEffect } from "react";

function useSessionTracking() {
  useEffect(() => {
    const session_id = localStorage.getItem("session_id");
    if (!session_id) {
      console.warn("No session ID found in sessionStorage");
      return;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const url = `${import.meta.env.VITE_BACKEND_URL}/logout-session`;
        const data = JSON.stringify({ session_id });

        try {
          // Try using sendBeacon first
          const blob = new Blob([data], { type: "application/json" });
          const success = navigator.sendBeacon(url, blob);
          if (!success) {
            // Fallback to axios
            axios.post(url, { session_id });
          }
        } catch (error) {
          console.error("Logout failed:", error);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}

export default useSessionTracking;
