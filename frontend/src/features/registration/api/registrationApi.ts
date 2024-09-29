import axios, { AxiosError } from "axios";
import { User } from "../../../entities/userModel";
import { API_BASE_URL } from "../../apiConfig";

interface ApiError {
  error: string;
}

export const registerUser = async (userData: User) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sign_up`, userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;

    const errorMessage =
      axiosError.response?.data?.error || "Ошибка регистрации";
    throw new Error(errorMessage);
  }
};
