import { useEffect, useState } from "react";
import { decrypt } from "../services/fernet/decrypt";
export const useGymId = () => {
  const [gymId, setGymId] = useState(() => sessionStorage.getItem("gym_id"));

  useEffect(() => {
    const handleStorageChange = () => {
      setGymId(sessionStorage.getItem("gym_id"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return gymId;
};
