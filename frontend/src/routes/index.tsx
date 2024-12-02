import { createBrowserRouter } from "react-router-dom";

import App from "@/App";

/** @layouts */
import AuthLayout from "@/layouts/auth-layout";

/** @pages */
import HomePage from "@/pages/home-page";
import RegisterPage from "@/pages/auth/register-page";
import LoginPage from "@/pages/auth/login-page";
import ErrorPage from "@/pages/error-page";

/** @components */
import { ProtectedRoute } from "@/components/protected-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          // <ProtectedRoute>
          <HomePage />
          // </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
