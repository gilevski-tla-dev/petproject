import apiClient from "../../app/ApiClient/axiosInstance";

export const getProfile = async () => {
  try {
    const response = await apiClient.get("/get_profile");
    return response.data;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    throw error;
  }
};
