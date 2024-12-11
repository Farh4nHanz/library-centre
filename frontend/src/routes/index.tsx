import { createBrowserRouter } from "react-router-dom";

/** @layouts */
import AuthLayout from "@/layouts/auth-layout";
import UserLayout from "@/layouts/user-layout";
import DashboardLayout from "@/layouts/dashboard-layout";

/** @pages */
import RegisterPage from "@/pages/auth/register-page";
import LoginPage from "@/pages/auth/login-page";
import HomePage from "@/pages/home-page";
import DashboardPage from "@/pages/dashboard";
import ErrorPage from "@/pages/error-page";
import BookPage from "@/pages/dashboard/book-page";

/** @components */
import { ProtectedRoute } from "@/components/protected-route";

export const router = createBrowserRouter([
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
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "books",
        element: <BookPage />,
      },
    ],
  },
  {
    path: "/",
    element: <UserLayout />,
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
]);
