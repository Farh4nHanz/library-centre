import { memo } from "react";
import { Link } from "react-router-dom";
import { type AuthLinkProps } from "@/types/props-type";
import { useAppDispatch } from "@/hooks/use-redux";
import { resetMessage } from "@/redux/slices/auth-slice";

export const AuthLink = memo(({ text, url, children }: AuthLinkProps) => {
  const dispatch = useAppDispatch();

  return (
    <p className="text-sm text-center">
      {text + " "}
      <Link
        to={url}
        className="text-blue-500"
        onClick={() => dispatch(resetMessage())}
      >
        {children}
      </Link>
    </p>
  );
});

AuthLink.displayName = "AuthLink";
