import axios from "axios";

export const API_BASE_URL = "http://localhost:3001/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Перехватчик для вставки accessToken в каждый запрос
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Перехватчик для обновления accessToken с использованием refreshToken
apiClient.interceptors.response.use(
  (response) => {
    return response; // Если запрос успешен, возвращаем его
  },
  async (error) => {
    const originalRequest = error.config;

    // Проверка, если accessToken истек
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // Запрос на обновление accessToken с использованием refreshToken
          const { data } = await axios.post(
            "http://localhost:3001/api/refresh",
            {
              refreshToken,
            }
          );

          // Обновляем accessToken и refreshToken
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          // Повторяем оригинальный запрос с новым токеном
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return apiClient(originalRequest); // Повторный запрос
        } catch (err) {
          // Если обновление токена не удалось — разлогиниваем пользователя
          console.log("Ошибка обновления токена", err);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          // Перенаправляем пользователя на страницу входа
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
