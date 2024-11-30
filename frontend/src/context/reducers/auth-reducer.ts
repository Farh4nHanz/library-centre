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
  isAuthenticated: false,
  status: "idle",
  successMsg: null,
  errorMsg: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    removeUser: () => {
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
        state.successMsg = action.payload as string;
        state.isAuthenticated = false;

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
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = "failed";
        state.isAuthenticated = false;
      })
      .addCase(
        refreshTokenUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isAuthenticated = true;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(refreshTokenUser.rejected, (state) => {
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      });
  },
});

export const { setIsAuthenticated, removeUser, resetMessage } =
  authSlice.actions;
export default authSlice.reducer;
