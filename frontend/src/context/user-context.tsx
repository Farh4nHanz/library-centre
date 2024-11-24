import { createContext, useContext, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/use-redux";
import { type User, type UserContextType } from "@/types";
import { getUserProfile } from "@/services/user-service";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated) {
        const userProfile = await getUserProfile();
        setUser(userProfile);
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used within a UserProvider");
  return context;
};
