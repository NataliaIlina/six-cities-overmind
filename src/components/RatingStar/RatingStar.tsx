import React from "react";

interface RatingStarProps {
  value: number;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isActive: boolean;
}

const RatingStar: React.FC<RatingStarProps> = ({
  value,
  title,
  onChange,
  isActive
}) => {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        onChange={onChange}
      />
      <label
        htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg
          className="form__star-image"
          width="37"
          height="33"
          style={{ fill: isActive ? "#FF9000" : "#c7c7c7" }}
        >
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
};

export default RatingStar;
