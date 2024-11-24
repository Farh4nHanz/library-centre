import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { type AlertProps } from "@/types";

export const CustomAlert = React.memo(
  ({ variant = "default", Icon, title, description }: AlertProps) => {
    return (
      <Alert variant={variant}>
        <Icon className="size-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    );
  }
);
