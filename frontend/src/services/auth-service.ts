import api from "@/api";
import { AuthResponse, UserPayload } from "@/types/api-type";
import { AxiosResponse } from "axios";

export const register = (
  userData: UserPayload
): Promise<AxiosResponse<AuthResponse>> => {
  return api.post("/auth/register", userData);
};

export const login = (
  userData: Omit<UserPayload, "username" | "photoURL">
): Promise<AxiosResponse<AuthResponse>> => {
  return api.post("/auth/login", userData);
};
