import { AxiosError } from "axios";
import api from "@/api";
import { AuthResponse, type CustomAxiosRequestConfig } from "@/types/api-type";
import { store } from "@/redux/store";
import { logoutUser, refreshTokenUser } from "@/redux/thunks/auth-thunk";

let isRefreshing: boolean = false; // Flag to prevent multiple refresh attempts
let failedQueue: any[] = []; // Queue to hold failed requests

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

export const axiosInterceptors = () => {
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<AuthResponse>) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      // Check if the error is due to an invalid password or if the refresh token is missing
      if (
        error.response?.status === 403 &&
        error.response?.data.message === "Please login first!" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        // Check if the original request is for login
        if (originalRequest.url?.includes("/auth/login")) {
          // This means the credentials were invalid, so we should not refresh the token
          return Promise.reject(error); // Propagate the error to be handled in the frontend
        }

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            await store.dispatch(refreshTokenUser());
            processQueue(null); // Resolve all failed requests
            return api(originalRequest); // Retry the original request
          } catch (refreshErr) {
            processQueue(refreshErr as AxiosError); // Reject all failed requests
            await store.dispatch(logoutUser());
            return Promise.reject(refreshErr);
          } finally {
            isRefreshing = false; // Reset the flag
          }
        }

        // If already refreshing, return a promise that resolves when the refresh is done
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      return Promise.reject(error);
    }
  );
};
