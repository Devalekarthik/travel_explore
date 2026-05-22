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
  // Convert rating to number and clamp between 0 and 5
  const ratingNum = Math.min(Math.max(Number(rating) || 0, 0), 5);
  const filledStars = Math.floor(ratingNum);
  const outlineStars = 5 - filledStars;

  return (
    <span className={`star-rating ${className}`}>
      {ratingNum}
      <FilledIcon />
    </span>
  );
};

export default StarRating;
