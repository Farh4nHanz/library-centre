import { AxiosResponse } from "axios";
import api from "@/api";
import { type Book } from "@/types";
import { type BookResponse, type BookPayload } from "@/types/api-type";

export const getAllBooks = async (): Promise<Book[]> => {
  const {
    data: { books },
  } = await api.get<BookResponse<Book[]>>("/books");
  return books;
};

export const getBookById = (
  id: string
): Promise<AxiosResponse<BookResponse<Book>>> => {
  return api.get(`/books/${id}`);
};

export const addBook = async (
  bookData: BookPayload
): Promise<BookResponse<Book>> => {
  const { data } = await api.post<BookResponse<Book>>("/books", bookData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
