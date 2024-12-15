import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/user-context";
import { Loader } from "@/components/ui/loader";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { setErrorMsg } from "@/redux/slices/auth-slice";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuth();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setErrorMsg("Please login first!"));
    }
  }, [dispatch, isAuthenticated]);

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader variant="2" color="black" size="lg" />
      </div>
    );

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};
