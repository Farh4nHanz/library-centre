import { store } from "@/context/store";

export type AuthState = {
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  successMsg: string | null;
  errorMsg: string | null;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
