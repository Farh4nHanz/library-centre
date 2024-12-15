import { createContext, PropsWithChildren, useContext, useState } from "react";
import { endOfYear, startOfYear } from "date-fns";
import { MonthContextType } from "@/types/context-type";

const MonthContext = createContext<MonthContextType | undefined>(undefined);

export const MonthProvider = ({ children }: PropsWithChildren) => {
  const [monthState, setMonthState] = useState({
    startMonth: startOfYear(new Date()),
    endMonth: endOfYear(new Date()),
  });

  return (
    <MonthContext.Provider value={{ monthState, setMonthState }}>
      {children}
    </MonthContext.Provider>
  );
};

export const useMonth = () => {
  const context = useContext(MonthContext);
  if (!context) throw new Error("useMonth must be used within a MonthProvider");
  return context;
};
