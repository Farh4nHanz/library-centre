import { useMutation } from "@tanstack/react-query";

export const useAddBook = () =>
  useMutation({
    mutationFn: () => {},
  });
