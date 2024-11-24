import { createBrowserRouter } from "react-router-dom";

import App from "@/App";

/** @layouts */
import AuthLayout from "@/layouts/auth-layout";

/** @pages */
import HomePage from "@/pages/home-page";
import RegisterPage from "@/pages/auth/register-page";
import LoginPage from "@/pages/auth/login-page";

/** @components */
import { ProtectedRoute } from "@/components/protected-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
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
