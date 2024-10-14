import apiClient from "../../app/ApiClient/axiosInstance";

export const getProfile = async () => {
  try {
    const response = await apiClient.get("/get_profile");
    console.log(response.data);
    return response.data; // Return the data here
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    throw new Error("Ошибка получения данных"); // Optionally throw an error for handling
  }
};
