import { Star } from "lucide-react";
import { memo } from "react";

export const StarRating = memo(
  ({ className, ...props }: React.HTMLAttributes<SVGSVGElement>) => {
    return (
      <Star size={16} className={className} color="transparent" {...props} />
    );
  }
);

StarRating.displayName = "StarRating";
