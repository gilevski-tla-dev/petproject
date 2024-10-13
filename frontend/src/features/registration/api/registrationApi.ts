import axios from "axios";
import { User } from "../../../entities/userModel";
import { API_BASE_URL } from "../../../app/ApiClient/ApiClient";

export const registerUser = async (userData: User) => {
  const response = await axios.post(`${API_BASE_URL}/sign_up`, userData);
  return response.data;
};
