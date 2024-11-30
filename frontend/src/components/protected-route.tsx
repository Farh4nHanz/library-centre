import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/user-context";
import { Loader } from "@/components/loader";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader variant="2" color="black" size="lg" />
      </div>
    );

  return user ? children : <Navigate to="/auth/login" replace />;
};
