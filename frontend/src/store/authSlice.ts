import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store"; // Импортируйте тип RootState

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
};

// Асинхронное обновление токена
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/refresh", {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to refresh token");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(refreshAccessToken.rejected, (state) => {
      state.isAuthenticated = false;
    });
  },
});

export const { setTokens, logout } = authSlice.actions;

// Добавляем и экспортируем селектор
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
