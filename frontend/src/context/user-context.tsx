import { createContext, useContext, useEffect, useState } from "react";
import { type User, type UserContextType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { checkAuth } from "@/context/thunks/auth-thunks";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isAuth = async () => {
    try {
      const user = await dispatch(checkAuth()).unwrap();
      if (user) return setCurrentUser(user);
    } catch {
      setCurrentUser(null);
      console.error("Error checking auth");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      isAuth();
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ currentUser, isAuthenticated, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used within a UserProvider");
  return context;
};
