import axios from "axios";
import { User } from "../../../entities/userModel";
import { API_BASE_URL } from "../../../app/ApiClient/axiosInstance";

export const loginUser = async (userData: User) => {
  const response = await axios.post(`${API_BASE_URL}/sign_in`, userData);
  return response.data;
};
