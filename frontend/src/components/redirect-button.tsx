import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { type RedirectButtonProps } from "@/types/props-type";

export const RedirectButton = React.memo(
  ({ url, children }: RedirectButtonProps) => {
    return (
      <Button asChild>
        <Link to={url}>{children}</Link>
      </Button>
    );
  }
);

RedirectButton.displayName = "RedirectButton";
