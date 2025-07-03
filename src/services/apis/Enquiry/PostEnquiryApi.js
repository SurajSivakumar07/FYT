import axios from "axios";

const url = import.meta.env.VITE_API_URL;
export const PostEnquiryApi = async (data) => {
  const res = await axios.post(`${url}/enquiries`, data);

  return res.data;
};
