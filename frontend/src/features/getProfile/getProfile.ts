import apiClient from "../../app/ApiClient/ApiClient";

const getProfile = async () => {
  try {
    const response = await apiClient.get("/get_profile"); // Используем apiClient
    console.log(response.data);
  } catch (error) {
    console.error("Ошибка получения данных:", error);
  }
};
