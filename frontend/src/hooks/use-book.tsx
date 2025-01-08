import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addBook,
  deleteBookById,
  getAllBooks,
  getBookById,
} from "@/services/book-service";
import { BOOK_QUERY_KEY } from "@/features/dashboard/constants";

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

export const useDeleteBookById = () =>
  useMutation({
    mutationFn: (bookId: string) => deleteBookById(bookId),
  });
