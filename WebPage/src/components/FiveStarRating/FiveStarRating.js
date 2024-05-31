import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./FiveStarRating.css"; // Asegúrate de importar el archivo CSS

const FiveStarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    onRatingChange(rate);
  };

  return (
    <div className="star-rating">
      {[...Array(10)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              size={30}
            />
          </label>
        );
      })}
    </div>
  );
};

export default FiveStarRating;
