import { AxiosRequestConfig } from "axios";
import { type Book, type User } from ".";

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

export type BookPayload = Omit<Book, "id">;

export type BookResponse<T> = {
  message: string;
  books: T;
};
