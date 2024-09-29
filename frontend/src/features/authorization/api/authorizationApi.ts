import axios from "axios";
import { User } from "../../../entities/userModel";
import { API_BASE_URL } from "../../apiConfig";

export const loginUser = async (userData: User) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/sign_in`, userData);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Ошибка регистрации");
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};
