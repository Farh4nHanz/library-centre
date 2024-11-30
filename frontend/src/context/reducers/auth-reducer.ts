import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type AuthState } from "@/types/redux-type";
import { type AuthResponse } from "@/types/api-type";

/** @actions */
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokenUser,
  checkAuth,
} from "@/context/thunks/auth-thunks";

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") as string) || null,
  status: "idle",
  successMsg: null,
  errorMsg: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
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
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "succeeded";
          state.successMsg = null;
          state.errorMsg = null;

          state.user = action.payload.user;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.successMsg = null;
        state.errorMsg = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.errorMsg = null;
        state.successMsg = action.payload as string;

        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload as string;
        state.successMsg = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(
        refreshTokenUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.user = action.payload.user;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(refreshTokenUser.rejected, (state) => {
        state.user = null;
        localStorage.removeItem("user");
      });
  },
});

export const { resetUserState, resetMessage } = authSlice.actions;
export default authSlice.reducer;
