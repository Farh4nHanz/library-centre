import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { RedirectButton } from "@/components/shared/redirect-button";
import { ArrowLeft } from "lucide-react";
import { type ErrorType } from "@/types";

const ErrorPage = () => {
  const { error, status, statusText } = useRouteError() as ErrorType;
  const originalURL = sessionStorage.getItem("path") || "/";

  useEffect(() => {
    const originalTitle = document.title;
    const errorTitle = `${status ? `${status} |` : "Error"} ${
      statusText ?? ""
    }`;

    document.title = errorTitle;

    return () => {
      document.title = originalTitle;
    };
  }, [status, statusText]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center space-y-5">
      <h1 className="text-2xl md:text-3xl font-bold">
        Oops! An unexpected error occured.
      </h1>
      <h3 className="text-xl">{error?.message}</h3>
      <div className="flex justify-between items-center gap-2">
        <p className="text-blue-700">{status}</p>
        <p className="text-muted-foreground italic">{statusText}</p>
      </div>

      <RedirectButton redirectTo={originalURL}>
        <ArrowLeft />
        Back
      </RedirectButton>
    </div>
  );
};

export default ErrorPage;
