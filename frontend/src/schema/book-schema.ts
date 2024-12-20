import { z } from "zod";

export const bookSchema = z.object({
  title: z.string({
    required_error: "Book title is required!",
    invalid_type_error: "Book title must be a string!",
  }),
  author: z.string({
    required_error: "Author is required!",
    invalid_type_error: "Author must be a string!",
  }),
  description: z.string({
    required_error: "Book description is required!",
    invalid_type_error: "Book description must be a string!",
  }),
  genre: z.string({ required_error: "Please add at least one genre!" }),
  cover: z.string({ required_error: "Book cover is required!" }),
  isbn: z
    .number({ invalid_type_error: "ISBN must be a number!" })
    .positive("ISBN must be a valid number!")
    .min(1000000000000, "ISBN must be 13 digits long!")
    .max(9999999999999, "ISBN must be 13 digits long!")
    .optional(),
  pages: z
    .number({
      required_error: "Book pages is required!",
      invalid_type_error: "Book pages must be a number!",
    })
    .min(1, "Book pages must be greater than 0!"),
  publisher: z.string({
    required_error: "Publisher is required!",
    invalid_type_error: "Publisher must be a string!",
  }),
  publicationDate: z
    .string({ required_error: "Publication date is required!" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format!",
    }),
  totalCopies: z
    .number({
      required_error: "Total book copies is required!",
      invalid_type_error: "Total book copies must be a number!",
    })
    .min(1, "Total book copies must be greater than 0!"),
});
