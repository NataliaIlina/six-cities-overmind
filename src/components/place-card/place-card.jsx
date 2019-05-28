import React from "react";
import PropTypes from "prop-types";

const PlaceCard = ({offer, onCardClick, onCardHover}) => (
  <article
    className="cities__place-card place-card"
    onMouseEnter={() => onCardHover(offer)}
  >
    {offer.is_premium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a
        href="#"
        className="place-card__link"
        onClick={(e) => {
          e.preventDefault();
          onCardClick(offer);
        }}
      >
        <img
          className="place-card__image"
          src={offer.preview_image}
          width="260"
          height="200"
          alt="Place image"
        />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button
          className={`place-card__bookmark-button button ${
            offer.is_favorite ? `place-card__bookmark-button--active` : ``
          }`}
          type="button"
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${(offer.rating * 100) / 5}%`}} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{offer.title}</a>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>
);

PlaceCard.propTypes = {
  offer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    is_premium: PropTypes.bool,
    rating: PropTypes.number,
    type: PropTypes.string.isRequired,
    preview_image: PropTypes.string
  }),
  onCardClick: PropTypes.func,
  onCardHover: PropTypes.func
};

export default PlaceCard;
