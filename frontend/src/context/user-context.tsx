import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { type User } from "@/types";
import { type UserContextType } from "@/types/context-type";
import { useAppDispatch } from "@/hooks/use-redux";
import { checkAuth } from "@/redux/thunks/auth-thunk";
import { removeUser, setIsAuthenticated } from "@/redux/slices/auth-slice";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated")!);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      const initAuth = async () => {
        try {
          const { user } = await dispatch(checkAuth()).unwrap();
          if (user) {
            dispatch(setIsAuthenticated(true));
            setUser(user);
          }
        } catch {
          dispatch(setIsAuthenticated(false));
          dispatch(removeUser());
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      };

      initAuth();
    }
  }, [isAuthenticated, dispatch]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used within a UserProvider");
  return context;
};
