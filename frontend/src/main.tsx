import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { router } from "@/routes";
import { store } from "@/context/store";
import { UserProvider } from "@/context/user-context";
import { axiosInterceptors } from "@/services/axios-interceptors";
import "./index.css";

const client = new QueryClient();

axiosInterceptors();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <UserProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </UserProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
