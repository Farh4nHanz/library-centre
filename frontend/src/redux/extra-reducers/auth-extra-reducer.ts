import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokenUser,
  checkAuth,
} from "@/redux/thunks/auth-thunk";
import { type AuthState } from "@/types/redux-type";
import { type AuthResponse } from "@/types/api-type";

export const extraReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(registerUser.pending, (state) => {
      state.status = "loading";
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.successMsg = action.payload;
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
    .addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.status = "succeeded";
        state.successMsg = null;
        state.errorMsg = null;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    )
    .addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.successMsg = null;
      state.errorMsg = action.payload as string;
      state.isAuthenticated = false;
    })
    .addCase(logoutUser.pending, (state) => {
      state.status = "loading";
    })
    .addCase(logoutUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.errorMsg = null;
      state.successMsg = action.payload;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.status = "failed";
      state.errorMsg = action.payload as string;
      state.successMsg = null;
    })
    .addCase(checkAuth.fulfilled, (state) => {
      state.status = "succeeded";
      state.isAuthenticated = true;
    })
    .addCase(checkAuth.rejected, (state, action) => {
      state.status = "failed";
      state.isAuthenticated = false;
      state.errorMsg = action.payload as string;
    })
    .addCase(
      refreshTokenUser.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    )
    .addCase(refreshTokenUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.errorMsg = action.payload as string;
      localStorage.removeItem("user");
    });
};
