// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"), // Инициализация токеном из localStorage
  isAuthenticated: !!localStorage.getItem("token"), // Установить как true, если токен есть
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload); // Сохранение токена в localStorage
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token"); // Удаление токена из localStorage при выходе
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
