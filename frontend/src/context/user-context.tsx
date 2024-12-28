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
import { setIsAuthenticated, setUserRole } from "@/redux/slices/auth-slice";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initAuth = async () => {
      const isAuthenticated = JSON.parse(
        localStorage.getItem("isAuthenticated")!
      );

      if (isAuthenticated) {
        const res = await dispatch(checkAuth());
        if (checkAuth.fulfilled.match(res)) {
          dispatch(setIsAuthenticated(true));
          setUser(res.payload.user);
          dispatch(setUserRole(res.payload.user.role));
        } else {
          dispatch(setIsAuthenticated(false));
          setUser(null);
        }
      }

      setIsLoading(false);
    };

    void initAuth();
  }, [dispatch]);

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
