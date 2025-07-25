import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  showValue = false,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center">
        {[...Array(maxRating)].map((_, index) => {
          const starRating = index + 1;
          const isFilled = starRating <= rating;
          const isPartial = starRating > rating && starRating - 1 < rating;

          return (
            <motion.button
              key={index}
              type="button"
              onClick={() => handleStarClick(starRating)}
              disabled={!interactive}
              whileHover={interactive ? { scale: 1.1 } : {}}
              whileTap={interactive ? { scale: 0.95 } : {}}
              className={`${
                interactive
                  ? "cursor-pointer hover:scale-110 transition-transform"
                  : "cursor-default"
              } relative`}>
              <Star
                className={`${sizeClasses[size]} ${
                  isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                } transition-colors duration-200`}
              />
              {isPartial && (
                <Star
                  className={`${sizeClasses[size]} text-yellow-400 fill-yellow-400 absolute top-0 left-0 transition-colors duration-200`}
                  style={{
                    clipPath: `inset(0 ${
                      100 - (rating - Math.floor(rating)) * 100
                    }% 0 0)`,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm text-gray-600 ml-2">
          {rating.toFixed(1)} / {maxRating}
        </span>
      )}
    </div>
  );
};

export default StarRating;
