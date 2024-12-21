import { AxiosResponse } from "axios";
import api from "@/api";
import { type AuthResponse, type UserPayload } from "@/types/api-type";

export const register = (
  userData: UserPayload
): Promise<AxiosResponse<Omit<AuthResponse, "user">>> => {
  return api.post("/auth/register", userData);
};

export const login = (
  userData: Omit<UserPayload, "username" | "photoURL">
): Promise<AxiosResponse<AuthResponse>> => {
  return api.post("/auth/login", userData);
};

export const logout = (): Promise<
  AxiosResponse<Omit<AuthResponse, "user">>
> => {
  return api.post("/auth/logout");
};

export const verifyCredentials = (): Promise<AxiosResponse<AuthResponse>> => {
  return api.get("/auth/me");
};

export const refreshToken = (): Promise<AxiosResponse<AuthResponse>> => {
  return api.post("/auth/refresh-token");
};
