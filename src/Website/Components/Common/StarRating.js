import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

/**
 * Reusable Star Rating Component
 * Displays star ratings with filled and outline stars
 * 
 * @param {Object} props
 * @param {number} props.rating - Rating value (0-5)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.filledIcon - Custom filled icon component
 * @param {string} props.outlineIcon - Custom outline icon component
 */
const StarRating = ({
  rating = 0,
  className = "",
  filledIcon: FilledIcon = StarRoundedIcon,
  outlineIcon: OutlineIcon = StarOutlineRoundedIcon,
}) => {
  const filledStars = Math.min(Math.max(rating, 0), 5);
  const outlineStars = 5 - filledStars;

  return (
    <span className={`star-rating ${className}`}>
      {[...Array(filledStars)].map((_, index) => (
        <FilledIcon key={`filled-${index}`} />
      ))}
      {[...Array(outlineStars)].map((_, index) => (
        <OutlineIcon key={`outline-${index}`} />
      ))}
    </span>
  );
};

export default StarRating;
