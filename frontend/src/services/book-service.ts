import { AxiosResponse } from "axios";
import api from "@/api";
import { type Book } from "@/types";
import { type BookResponse, type BookPayload } from "@/types/api-type";

export const getAllBooks = (): Promise<AxiosResponse<BookResponse<Book[]>>> => {
  return api.get("/books");
};

export const getBookById = (
  id: string
): Promise<AxiosResponse<BookResponse<Book>>> => {
  return api.get(`/books/${id}`);
};

export const addBook = (
  bookData: BookPayload
): Promise<AxiosResponse<BookResponse<Book>>> => {
  return api.post("/books", bookData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
