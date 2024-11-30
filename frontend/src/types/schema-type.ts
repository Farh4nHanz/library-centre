import { loginFormSchema, registerFormSchema } from "@/schema/auth-schema";
import { z } from "zod";

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
