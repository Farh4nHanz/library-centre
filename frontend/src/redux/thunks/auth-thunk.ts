import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/api";
import { type AuthResponse, type UserPayload } from "@/types/api-type";
import { register } from "@/services/auth-service";

export const registerUser = createAsyncThunk<AuthResponse, UserPayload>(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await register(userData);
      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        console.error(`API Error:`, err.message);
        return rejectWithValue(err.response.data.message);
      }

      console.error("Unexpected error:", err);
      return rejectWithValue("Unable to register. Please try again later.");
    }
  }
);

export const loginUser = createAsyncThunk<
  AuthResponse,
  Omit<UserPayload, "username" | "photoURL">
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await api.post<AuthResponse>("/auth/login", userData);
    return data;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      console.error(`API Error:`, err.message);
      return rejectWithValue(err.response.data.message);
    }

    console.error("Unexpected error:", err);
    return rejectWithValue("Unable to log in. Please try again later.");
  }
});

export const logoutUser = createAsyncThunk<AuthResponse>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/logout");
      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        console.error(`API Error:`, err.message);
        return rejectWithValue(err.response.data.message);
      }

      console.error("Unexpected error:", err);
      return rejectWithValue("Unable to log out. Please try again later.");
    }
  }
);

export const checkAuth = createAsyncThunk<AuthResponse>(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<AuthResponse>("/auth/me");
      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        console.error(`API Error:`, err.message);
        return rejectWithValue(err.response.data.message);
      }

      console.error("Unexpected error:", err);
      return rejectWithValue(
        "An unexpected error occurred. Please try again later."
      );
    }
  }
);

export const refreshTokenUser = createAsyncThunk<AuthResponse>(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/refresh-token");
      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        console.error(`API Error:`, err.message);
        return rejectWithValue(err.response.data.message);
      }

      console.error("Unexpected error:", err);
      return rejectWithValue(
        "Failed to refresh token. Please try again later."
      );
    }
  }
);
