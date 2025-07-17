import axios from "axios";
import { useGymId } from "../../../hooks/useGymId";

// ✅ Get backend URL from .env
const url = import.meta.env.VITE_API_URL;

export const pendingBalanceApi = async ({ member_id, data }) => {
  const gym_id = localStorage.getItem("gym_id");
  const res = await axios.put(
    `${url}/gyms/balance/${gym_id}/${member_id}`,
    data
  );
  return res.data;
};
