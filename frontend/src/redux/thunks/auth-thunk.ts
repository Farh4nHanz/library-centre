import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type AuthResponse, type UserPayload } from "@/types/api-type";
import {
  login,
  logout,
  refreshToken,
  register,
  verifyCredentials,
} from "@/services/auth-service";

export const registerUser = createAsyncThunk<
  Omit<AuthResponse, "user">,
  UserPayload
>("auth/registerUser", async (userData, { rejectWithValue }) => {
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
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  Omit<UserPayload, "username" | "photoURL">
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await login(userData);
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

export const logoutUser = createAsyncThunk<string>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await logout();
      return data.message;
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
      const { data } = await verifyCredentials();
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
      const { data } = await refreshToken();
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
