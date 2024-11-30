import { store } from "@/context/store";
import { User } from "@/types/user-type";

export type AuthState = {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  successMsg: string | null;
  errorMsg: string | null;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
