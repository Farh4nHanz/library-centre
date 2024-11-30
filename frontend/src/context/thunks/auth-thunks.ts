import { createAsyncThunk } from "@reduxjs/toolkit";

/** @types */
import { type User, type UserPayload } from "@/types/user-type";
import { type AuthResponse } from "@/types/api-type";

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
  AuthResponse,
  Omit<UserPayload, "username">
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    return await apiCall<AuthResponse>("post", "/auth/login", userData);
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

export const checkAuth = createAsyncThunk<User>(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const user = await apiCall<User>("get", "/auth/me");
      return user;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const refreshTokenUser = createAsyncThunk<AuthResponse>(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      return await apiCall<AuthResponse>("post", "/auth/refresh-token");
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);
