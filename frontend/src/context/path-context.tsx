import { createContext, useContext, PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { type PathContextType } from "@/types/context-type";

const PathContext = createContext<PathContextType | undefined>(undefined);

export const PathProvider = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();

  useEffect(() => {
    sessionStorage.setItem("path", pathname);
  }, [pathname]);

  return (
    <PathContext.Provider value={{ path: pathname }}>
      {children}
    </PathContext.Provider>
  );
};

export const usePath = () => {
  const context = useContext(PathContext);
  if (!context) throw new Error("usePath must be used within a PathProvider");
  return context;
};
