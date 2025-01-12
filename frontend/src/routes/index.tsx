import { createBrowserRouter } from "react-router-dom";

/** @components */
import { ProtectedRoute } from "@/components/shared/protected-route";

/** @layouts */
import UserLayout from "@/layouts/user-layout";
import DashboardLayout from "@/layouts/dashboard-layout";

/** @pages */
import RegisterPage from "@/pages/auth/register-page";
import LoginPage from "@/pages/auth/login-page";
import HomePage from "@/pages/home-page";
import DashboardPage from "@/pages/dashboard";
import ErrorPage from "@/pages/error-page";
import BookPage from "@/pages/dashboard/book-page";

/** @context */
import { MonthProvider } from "@/context/month-context";
import { PathProvider } from "@/context/path-context";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: (
      <PathProvider>
        <RegisterPage />
      </PathProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <PathProvider>
        <LoginPage />
      </PathProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <PathProvider>
          <MonthProvider>
            <DashboardLayout />
          </MonthProvider>
        </PathProvider>
      </ProtectedRoute>
    ),
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
    element: (
      <PathProvider>
        <UserLayout />
      </PathProvider>
    ),
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
