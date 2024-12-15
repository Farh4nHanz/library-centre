import { Dispatch, SetStateAction } from "react";
import { User } from "@/types/user-type";

export type UserContextType = {
  user: User | null;
  isLoading: boolean;
};

export type MonthContextType = {
  monthState: {
    startMonth: Date;
    endMonth: Date;
  };
  setMonthState: Dispatch<SetStateAction<{ startMonth: Date; endMonth: Date }>>;
};
