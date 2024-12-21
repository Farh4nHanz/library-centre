import api from "@/api";
import { type Book } from "@/types";

export const addBook = (bookData: Book) => {
  return api.post("/books", bookData);
};
