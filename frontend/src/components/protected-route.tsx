import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/user-context";
import { Loader } from "@/components/loader";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <Loader variant="2" color="black" size="xl" />;

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};
