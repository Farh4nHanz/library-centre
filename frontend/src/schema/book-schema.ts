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
  cover: z
    .instanceof(File, { message: "Book cover is required!" })
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "File size must be less than 2MB!"
    )
    .refine(
      (file) => ["image/jpg", "image/jpeg", "image/png"].includes(file.type),
      "Only .jpg, .jpeg, and .png formats are allowed."
    ),
  isbn: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === undefined || val === "") return true;
        return !val.startsWith("0");
      },
      { message: "ISBN cannot start with 0!" }
    )
    .refine(
      (val) => {
        if (val === undefined || val === "") return true;
        return /^\d{13}$/.test(val);
      },
      { message: "ISBN must be 13 digits long!" }
    )
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
  pages: z
    .string({ required_error: "Book pages is required!" })
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number({ invalid_type_error: "Book pages must be a number!" })
        .min(1, "Book pages must be greater than 0!")
    ),
  totalCopies: z
    .string({ required_error: "Total book copies is required!" })
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number({ invalid_type_error: "Total book copies must be a number!" })
        .min(1, "Total book copies must be greater than 0!")
    ),
  publisher: z.string({
    required_error: "Publisher is required!",
    invalid_type_error: "Publisher must be a string!",
  }),
  publicationDate: z
    .string({ required_error: "Publication date is required!" })
    .transform((val) => new Date(val))
    .pipe(z.date({ invalid_type_error: "Invalid date format!" })),
});
