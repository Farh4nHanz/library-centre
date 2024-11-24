import { createSlice } from "@reduxjs/toolkit";
import { type AuthState } from "@/types";

/** @actions */
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokenUser,
} from "@/context/thunks/auth-thunks";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  successMsg: null,
  errorMsg: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.successMsg = null;
      state.errorMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.successMsg = action.payload as string;
        state.errorMsg = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.successMsg = null;
        state.errorMsg = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.successMsg = null;
        state.errorMsg = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.successMsg = null;
        state.errorMsg = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = false;
        state.user = null;
        state.errorMsg = null;
        state.successMsg = action.payload as string;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload as string;
        state.successMsg = null;
      })
      .addCase(refreshTokenUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(refreshTokenUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { resetMessage } = authSlice.actions;
export default authSlice.reducer;
