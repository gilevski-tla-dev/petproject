import axios from "axios";
import { store } from "../../store/store";
import { logout } from "../../store/AuthSlice";

export const API_BASE_URL = "http://localhost:3001/api";
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor for adding accessToken to each request
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken && config.url !== "/sign_in") {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Function to refresh accessToken
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post(`${API_BASE_URL}/refresh`, {
      refresh_token: refreshToken,
    });
    const { access_token: newAccessToken } = response.data;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to refresh access token");
  }
};

// Interceptor for handling errors and refreshing tokens
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
