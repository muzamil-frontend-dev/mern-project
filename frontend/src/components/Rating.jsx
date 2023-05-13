import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

const Rating = ({ rating, text }) => {
  const totalRating = [1, 2, 3, 4, 5];
  return (
    <div>
      {totalRating.map((rate, index) =>
        rate <= rating ? (
          <FontAwesomeIcon key={index} icon={faStar} />
        ) : rate - 0.5 === rating ? (
          <FontAwesomeIcon key={index} icon={faStarHalfStroke} />
        ) : (
          <FontAwesomeIcon key={index} icon={faRegularStar} />
        )
      )}
      <span>{text}</span>
    </div>
  );
};

export default Rating;
