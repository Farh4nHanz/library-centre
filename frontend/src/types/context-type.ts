import { Dispatch, SetStateAction } from "react";
import { type User } from ".";

export type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export type MonthContextType = {
  monthState: {
    startMonth: Date;
    endMonth: Date;
  };
  setMonthState: Dispatch<SetStateAction<{ startMonth: Date; endMonth: Date }>>;
};

export type PathContextType = {
  path: string;
};
