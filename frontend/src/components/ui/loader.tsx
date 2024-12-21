import { memo } from "react";
import { type LoaderProps } from "@/types/props-type";
import { cn } from "@/lib/utils";
import { loader, variantMap } from "@/constants";
import { Loader2 } from "lucide-react";

export const Loader = memo(
  ({ className, variant = "1", size = "md", color = "black" }: LoaderProps) => {
    const LoaderComponent = variantMap[variant] || Loader2;

    return (
      <LoaderComponent
        className={cn(
          "animate-spin duration-150",
          loader({ color, size }),
          className
        )}
      />
    );
  }
);

Loader.displayName = "Loader";
