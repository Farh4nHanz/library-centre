import { z } from "zod";
import { loginFormSchema, registerFormSchema } from "@/schema/auth-schema";
import { bookSchema } from "@/schema/book-schema";

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export type BookSchema = z.infer<typeof bookSchema>;