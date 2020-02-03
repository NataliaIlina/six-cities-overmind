import React, { useState, useMemo } from "react";
import { RATINGS, MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH } from "src/constants";
import PropTypes from "prop-types";
import { RatingStar } from "src/components";

interface ReviewFormProps {
  addComment: (id: number, rating: number, review: string) => void;
  hotelId: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ addComment, hotelId }) => {
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const isFormValid = useMemo(
    () =>
      rating !== 0 &&
      review &&
      review.length >= MIN_REVIEW_LENGTH &&
      review.length <= MAX_REVIEW_LENGTH,
    [rating, review]
  );

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      addComment(hotelId, rating, review);
      setReview("");
      setRating(0);
    }
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map(({ value, title }) => (
          <RatingStar
            key={value}
            value={value}
            title={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRating(parseInt(e.target.value, 10))
            }
            isActive={value <= rating}
          />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setReview(e.target.value)
        }
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{` `}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{` `}
          <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  hotelId: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired
};

export default ReviewForm;
