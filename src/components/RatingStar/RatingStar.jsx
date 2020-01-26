import React from "react";
import PropTypes from "prop-types";

const RatingStar = ({ value, title, onChange, isActive }) => {
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

RatingStar.propTypes = {
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default RatingStar;
