import { configureStore } from "@reduxjs/toolkit";

/** @reducers */
import authReducer from "@/redux/slices/auth-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
