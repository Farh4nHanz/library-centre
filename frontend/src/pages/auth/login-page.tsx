import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/** @schema */
import { loginFormSchema } from "@/schema/auth-schema";

/** @types */
import { type LoginFormSchema } from "@/types";

/** @components */
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password-input";
import { CustomAlert as Alert } from "@/components/custom-alert";
import { Loader } from "@/components/loader";

/** @hooks */
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";

/** @context */
import { loginUser } from "@/context/thunks/auth-thunks";

/** @icons */
import { CheckCircle, TriangleAlert } from "lucide-react";

const LoginPage = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const dispatch = useAppDispatch();
  const { status, successMsg, errorMsg } = useAppSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  const login = handleSubmit(async (values) => {
    const res = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(res)) {
      form.reset();
      navigate("/", { replace: true });
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={login}
        className="w-full max-w-md p-5 space-y-5 border rounded-md"
      >
        {/* form header */}
        <h1 className="text-xl font-bold text-start">Welcome Back!</h1>

        {/* success message from register page */}
        {status !== "idle" && status !== "loading" && (
          <Alert
            variant={status === "failed" ? "destructive" : "success"}
            Icon={status === "failed" ? TriangleAlert : CheckCircle}
            title={status === "failed" ? "Error" : "Success"}
            description={status === "failed" ? errorMsg : successMsg}
          />
        )}

        <div className="flex flex-col gap-3">
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
            errors={errors}
          />
        </div>

        <Button type="submit" className="w-full">
          {status === "loading" ? (
            <Loader variant="1" color="white" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginPage;