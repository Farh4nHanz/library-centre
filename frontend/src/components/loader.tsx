import { cn, getLoaderSize, getColorClass } from "@/lib/utils";
import { Loader2, LucideLoader } from "lucide-react";
import { type LoaderProps } from "@/types";

export const Loader = ({
  className,
  variant = "1",
  size = "md",
  color = "black",
}: LoaderProps) => {
  return variant === "1" ? (
    <Loader2
      className={cn(
        "animate-spin",
        getLoaderSize(size),
        getColorClass(color),
        className
      )}
    />
  ) : variant === "2" ? (
    <LucideLoader
      className={cn(
        "animate-spin",
        getLoaderSize(size),
        getColorClass(color),
        className
      )}
    />
  ) : null;
};
