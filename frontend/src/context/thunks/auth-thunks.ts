import { createAsyncThunk } from "@reduxjs/toolkit";

/** @types */
import {
  type AuthResponse,
  type LoginResponse,
  type UserPayload,
} from "@/types";

/** @libs */
import { apiCall } from "@/lib/api-call";

export const registerUser = createAsyncThunk<string, UserPayload>(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await apiCall<AuthResponse>(
        "post",
        "/auth/register",
        userData
      );

      return res.message;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const loginUser = createAsyncThunk<
  LoginResponse,
  Omit<UserPayload, "username">
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    return await apiCall<LoginResponse>("post", "/auth/login", userData);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const logoutUser = createAsyncThunk<string>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiCall<AuthResponse>("post", "/auth/logout");
      return res.message;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const refreshTokenUser = createAsyncThunk<LoginResponse>(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      return await apiCall<LoginResponse>("post", "/auth/refresh-token");
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);
