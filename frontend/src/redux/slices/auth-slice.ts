import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "@/redux/extra-reducers/auth-extra-reducer";
import { reducers } from "@/redux/reducers/auth-reducer";
import { type AuthState } from "@/types/redux-type";

const initialState: AuthState = {
  isAuthenticated: false,
  isLogout: false,
  status: "idle",
  successMsg: null,
  errorMsg: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers,
  extraReducers,
});

export const { setIsAuthenticated, setUserRole, setErrorMsg, resetMessage } =
  authSlice.actions;

export default authSlice.reducer;
