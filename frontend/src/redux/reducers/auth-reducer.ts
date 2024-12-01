import { PayloadAction } from "@reduxjs/toolkit";
import { type AuthState } from "@/types/redux-type";

export const reducers = {
  setIsAuthenticated: (state: AuthState, action: PayloadAction<boolean>) => {
    state.isAuthenticated = action.payload;
  },
  removeUser: () => {
    localStorage.removeItem("user");
  },
  setErrorMsg: (state: AuthState, action: PayloadAction<string>) => {
    state.errorMsg = action.payload;
  },
  resetMessage: (state: AuthState) => {
    state.successMsg = null;
    state.errorMsg = null;
  },
};
