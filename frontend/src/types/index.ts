import { HTMLAttributes, InputHTMLAttributes } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { z } from "zod";
import { AxiosRequestConfig } from "axios";
import { VariantProps } from "class-variance-authority";
import { loginFormSchema, registerFormSchema } from "@/schema/auth-schema";
import { store } from "@/context/store";
import { Alert } from "@/components/ui/alert";

export type CustomAxiosRequestConfig = {
  _retry?: boolean;
} & AxiosRequestConfig;

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  description?: string;
  Icon?: React.ComponentType<HTMLAttributes<Element>>;
} & InputHTMLAttributes<HTMLInputElement>;

export type PasswordInputProps<T extends FieldValues> = {
  errors: any;
} & Omit<FormInputProps<T>, "type" | "Icon">;

export type User = {
  id: string;
  username: string;
  role: "user" | "admin";
};

export type UserPayload = {
  username: string;
  email: string;
  password: string;
  photoURL?: string;
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export type AuthResponse = {
  message: string;
};

export type LoginResponse = {
  user: User;
} & AuthResponse;

export type ApiMethod = "get" | "post" | "put" | "patch" | "delete";

export type AuthURL =
  | "/auth/register"
  | "/auth/login"
  | "/auth/logout"
  | "/auth/refresh-token";

export type UserURL = "/users/profile";

export type URL = AuthURL | UserURL;

export type AuthState = {
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  successMsg: string | null;
  errorMsg: string | null;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type LoaderProps = {
  className?: HTMLAttributes<HTMLElement>["className"];
  variant?: "1" | "2";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "black" | "white" | "blue" | "green" | "red" | "yellow";
};

export type AlertProps = {
  variant?: VariantProps<typeof Alert>["variant"];
  Icon: React.ComponentType<HTMLAttributes<Element>>;
  title: string;
  description: string | null;
};
