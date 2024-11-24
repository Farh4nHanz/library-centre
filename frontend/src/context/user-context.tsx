import { createContext, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { type UserContextType } from "@/types";
import { refreshTokenUser } from "@/context/thunks/auth-thunks";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const refreshUser = async () => {
    try {
      await dispatch(refreshTokenUser()).unwrap();
    } catch (err) {
      console.error("Failed to refresh user:", err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      refreshUser();
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ user, isAuthenticated, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used within a UserProvider");
  return context;
};
