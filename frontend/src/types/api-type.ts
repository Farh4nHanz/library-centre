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

export type BookPayload = Omit<
  Book,
  "id" | "coverURL" | "availableCopies" | "rating" | "slug"
>;

export type BookResponse = {
  message: string;
  book?: Book;
  books?: Book[];
};
