import { memo } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { type CustomAlertProps } from "@/types/props-type";

export const CustomAlert = memo(
  ({ variant = "default", Icon, title, description }: CustomAlertProps) => {
    return (
      <Alert variant={variant}>
        <Icon className="size-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    );
  }
);

CustomAlert.displayName = "CustomAlert";
