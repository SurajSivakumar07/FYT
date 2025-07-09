import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const UpdateEnquiryApi = async ({ enquiryId, status, gym_id }) => {
  const res = await axios.patch(`${url}/enquiries/${enquiryId}/${gym_id}`, {
    status,
  });
  return res.data;
};
