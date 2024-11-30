import { createContext, useContext, useEffect, useState } from "react";
import { type User, type UserContextType } from "@/types/user-type";
import { useAppDispatch } from "@/hooks/use-redux";
import { checkAuth } from "@/context/thunks/auth-thunks";
import { resetUserState } from "@/context/reducers/auth-reducer";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user: User = JSON.parse(localStorage.getItem("user") as string);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  // const validateUser = async () => {
  //   const res = await dispatch(checkAuth());
  //   if (checkAuth.rejected.match(res)) {
  //     dispatch(resetUserState());
  //     setIsLoading(false);
  //   }

  //   setIsLoading(false);
  // };

  useEffect(() => {
    const validateUser = async () => {
      try {
        await dispatch(checkAuth());
      } catch {
        dispatch(resetUserState());
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      validateUser();
    }
  }, [user]);

  console.log(isLoading);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used within a UserProvider");
  return context;
};
