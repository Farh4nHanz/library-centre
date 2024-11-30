import { AxiosRequestConfig } from "axios";
import { User } from "@/types/user-type";

export type CustomAxiosRequestConfig = {
  _retry?: boolean;
} & AxiosRequestConfig;

export type ApiMethod = "get" | "post" | "put" | "patch" | "delete";

export type AuthURL =
  | "/auth/register"
  | "/auth/login"
  | "/auth/logout"
  | "/auth/me"
  | "/auth/refresh-token";

export type UserURL = "/users/profile";

export type URL = AuthURL | UserURL;

export type AuthResponse = {
  message: string;
  user: User;
};