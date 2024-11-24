import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/use-redux";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};
