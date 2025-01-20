import { memo } from "react";
import { type StarRatingProps } from "@/types/props-type";
import { Star } from "lucide-react";

export const StarRating = memo(({ rating, total = 5 }: StarRatingProps) => {
  const filledStars = Math.floor(rating);
  const partialFill = rating % 1;
  const emptyStars = total - Math.ceil(rating);

  return (
    <div className="inline-flex gap-0">
      {/* filled stars */}
      {Array.from({ length: filledStars }, (_, i) => (
        <Star
          key={`filled-${i}`}
          size={16}
          className="fill-amber-400 text-amber-400"
        />
      ))}

      {/* partial star */}
      {partialFill > 0 && (
        <div className="relative">
          <Star size={16} className="fill-gray-200 text-gray-200" />
          <div className="absolute inset-0 overflow-hidden">
            <Star
              size={16}
              className="fill-amber-400 text-amber-400"
              style={{
                clipPath: `inset(0 ${100 - partialFill * 100}% 0 0)`,
              }}
            />
          </div>
        </div>
      )}

      {/* empty stars */}
      {Array.from({ length: emptyStars }, (_, i) => (
        <Star
          key={`empty-${i}`}
          size={16}
          className="fill-gray-200 text-gray-200"
        />
      ))}
    </div>
  );
});

StarRating.displayName = "StarRating";
