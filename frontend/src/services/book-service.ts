import { AxiosResponse } from "axios";
import api from "@/api";
import { type BookResponse, type BookPayload } from "@/types/api-type";

export const getAllBooks = async () => {
  const {
    status,
    data: { books },
  }: AxiosResponse<BookResponse> = await api.get("/books");

  if (status === 200) return books;
};

export const getBookById = (
  id: string
): Promise<AxiosResponse<BookResponse>> => {
  return api.get(`/books/${id}`);
};

export const addBook = async (bookData: BookPayload): Promise<BookResponse> => {
  const { data }: AxiosResponse<BookResponse> = await api.post(
    "/books",
    bookData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const deleteBookById = async (
  bookId: string
): Promise<Omit<BookResponse, "books" | "book">> => {
  const { data }: AxiosResponse<BookResponse> = await api.delete(
    `/books/${bookId}`
  );
  return data;
};
