import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required!",
      invalid_type_error: "Username must be a string!",
    })
    .min(6, "Username must be at least 6 characters.")
    .max(30, "Maximum character is 30!"),
  email: z
    .string({
      required_error: "Email is required!",
      invalid_type_error: "Email must be a string!",
    })
    .regex(/^[a-zA-Z]+[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email!"),
  password: z
    .string({
      required_error: "Password is required!",
      invalid_type_error: "Password must be a string!",
    })
    .min(8, "Password must be at least 8 characters.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
      "Password must be at least 8 characters, includes one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required!",
      invalid_type_error: "Email must be a string!",
    })
    .regex(/^[a-zA-Z]+[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email!"),
  password: z.string({
    required_error: "Password is required!",
    invalid_type_error: "Password must be a string!",
  }),
});

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
});
