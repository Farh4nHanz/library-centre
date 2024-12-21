import { Dispatch, SetStateAction } from "react";
import { type User } from ".";

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

export type PathContextType = {
  path: string;
};
