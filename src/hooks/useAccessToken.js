import { useState, useEffect } from "react";

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("oai-did")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem("oai-did"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return accessToken;
};
