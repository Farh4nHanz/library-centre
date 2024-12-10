import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { type RedirectButtonProps } from "@/types/props-type";

export const RedirectButton = memo(
  ({ redirectTo, children }: RedirectButtonProps) => {
    return (
      <Button asChild>
        <Link to={redirectTo}>{children}</Link>
      </Button>
    );
  }
);

RedirectButton.displayName = "RedirectButton";
