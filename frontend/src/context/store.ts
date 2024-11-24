import { configureStore } from "@reduxjs/toolkit";

/** @reducers */
import authReducer from "@/context/reducers/auth-reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
