import { useMutation, useQuery } from "@tanstack/react-query";
import { type BookPayload } from "@/types/api-type";
import { BOOK_QUERY_KEY } from "@/constants/dashboard";
import {
  addBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "@/services/book-service";

export const useGetAllBooks = () =>
  useQuery({
    queryKey: [BOOK_QUERY_KEY[0]],
    queryFn: getAllBooks,
    refetchOnWindowFocus: false,
    staleTime: 3000,
  });

export const useGetBookById = (id: string) =>
  useQuery({
    queryKey: [BOOK_QUERY_KEY[1]],
    queryFn: () => getBookById(id),
    refetchOnWindowFocus: false,
    staleTime: 3000,
  });

export const useAddBook = () =>
  useMutation({
    mutationFn: addBook,
  });

export const useUpdateBookById = () =>
  useMutation({
    mutationFn: ({
      bookId,
      bookData,
    }: {
      bookId: string;
      bookData: BookPayload;
    }) => updateBookById(bookId, bookData),
  });

export const useDeleteBookById = () =>
  useMutation({
    mutationFn: (bookId: string) => deleteBookById(bookId),
  });
