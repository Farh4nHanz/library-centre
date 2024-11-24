import { z } from "zod";

/**
 * Register form schema.
 * It will be combined with shadcn ui form
 *
 * @remarks
 * This schema is used to validate the register form
 *
 * @property {string} username - Username of the user
 * @property {string} email - Email of the user
 * @property {string} password - Password of the user
 * @property {string} confirmPassword - Confirm password of the user
 *
 * @example
 * const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
 */
export const registerFormSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required." })
      .regex(/^[a-zA-Z]/, "Username must starts with letter")
      .min(6, "Username must be at least 6 characters.")
      .max(30, "Maximum character is 30"),
    email: z
      .string({ required_error: "Email is required." })
      .regex(/^[a-zA-Z]/, "Invalid email.")
      .email("Invalid email"),
    password: z
      .string({ required_error: "Password is required." })
      .min(8, "Password must be at least 8 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
        "Password too weak."
      ),
    confirmPassword: z.string({
      required_error: "Confirm password is required.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

/**
  * @property {string} email - Email of the user
  * @property {string} password - Password of the user
  *
  * @example
  * const form = useForm<LoginFormSchema>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
  */
export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .regex(/^[a-zA-z]/, "Invalid email.")
    .email("Invalid email."),
  password: z.string({ required_error: "Password is required." }),
});
