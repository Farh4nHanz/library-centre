import { memo } from "react";
import { Link } from "react-router-dom";
import { type AuthLinkProps } from "@/types/props-type";

export const AuthLink = memo(({ text, url, children }: AuthLinkProps) => {
  return (
    <p className="text-sm text-center">
      {text + " "}
      <Link to={url} className="text-blue-500">
        {children}
      </Link>
    </p>
  );
});

AuthLink.displayName = "AuthLink";
