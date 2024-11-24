import { useEffect } from "react";
import { AxiosError } from "axios";
import api from "@/api";
import { type CustomAxiosRequestConfig } from "@/types";
import { useAppDispatch } from "@/hooks/use-redux";
import { logoutUser, refreshTokenUser } from "@/context/thunks/auth-thunks";

export const useAxiosInterceptors = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (responseErr: AxiosError) => {
        const originalRequest = responseErr.config as CustomAxiosRequestConfig;

        // if the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and need to refresh
        if (responseErr.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await dispatch(refreshTokenUser());
            return api(originalRequest);
          } catch (refreshErr) {
            await dispatch(logoutUser());
            return Promise.reject(refreshErr);
          }
        }

        return Promise.reject(responseErr);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [dispatch]);
};
