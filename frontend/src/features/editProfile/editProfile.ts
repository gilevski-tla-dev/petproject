import apiClient from "../../app/ApiClient/axiosInstance";
import { User } from "../../entities/userModel";

export const editProfile = async (userData: User) => {
  try {
    const response = await apiClient.put("/edit_profile", userData);
    return response.data;
  } catch (error) {
    console.error("Failed to edit profile", error);
    throw error;
  }
};
