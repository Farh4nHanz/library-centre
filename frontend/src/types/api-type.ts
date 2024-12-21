import { AxiosRequestConfig } from "axios";
import { type User } from ".";

export type CustomAxiosRequestConfig = {
  _retry?: boolean;
} & AxiosRequestConfig;

export type AuthResponse = {
  message: string;
  user: User;
};

export type UserPayload = {
  username: string;
  email: string;
  password: string;
  photoURL?: string;
};

// export type BookPayload = {

// }