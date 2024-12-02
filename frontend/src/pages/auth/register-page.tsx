import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

/** @components */
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form-input";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { CustomAlert as ErrorAlert } from "@/components/custom-alert";

/** @types */
import { type RegisterFormSchema } from "@/types/schema-type";

/** @schema */
import { registerFormSchema } from "@/schema/auth-schema";

/** @context */
import { registerUser } from "@/redux/thunks/auth-thunk";

/** @hooks */
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { useIsAuth } from "@/hooks/use-is-auth";

/** @icons */
import { TriangleAlert } from "lucide-react";

const RegisterPage = () => {
  useIsAuth();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const dispatch = useAppDispatch();
  const { status, errorMsg } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const register = handleSubmit(async (values) => {
    const { username, email, password } = values;
    const res = await dispatch(registerUser({ username, email, password }));
    if (registerUser.fulfilled.match(res)) {
      form.reset();
      navigate("/auth/login", { replace: true });
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={register}
        className="w-full max-w-md p-5 space-y-5 border rounded-md"
      >
        {/* form header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-start">Hi there!</h1>
          <p className="text-slate-800 text-sm">
            Please fill in the details below.
          </p>
        </div>

        {/* error alert */}
        {errorMsg && (
          <ErrorAlert
            Icon={TriangleAlert}
            variant="destructive"
            title="Error"
            description={errorMsg}
          />
        )}

        <div className="flex flex-col gap-3">
          {/* username input */}
          <FormInput
            control={control}
            type="text"
            name="username"
            placeholder="Your Name"
          />

          {/* email input */}
          <FormInput
            control={control}
            type="email"
            name="email"
            placeholder="your@email.com"
          />

          {/* password input */}
          <PasswordInput
            control={control}
            name="password"
            placeholder="********"
            description="Use 8 characters, include one capital letter, one number and one special character."
            errors={errors}
          />

          {/* confirm password input */}
          <PasswordInput
            control={control}
            name="confirmPassword"
            placeholder="********"
            errors={errors}
          />
        </div>

        <Button type="submit" className="w-full">
          {status === "loading" ? (
            <Loader variant="1" color="white" />
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterPage;
