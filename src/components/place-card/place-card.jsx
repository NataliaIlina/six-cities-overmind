import React from "react";
import PropTypes from "prop-types";

const PlaceCard = ({place, onCardTitleClick}) => (
  <article className="cities__place-card place-card">
    {place.isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img
          className="place-card__image"
          src={place.url}
          width="260"
          height="200"
          alt="Place image"
        />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{place.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${place.rating}%`}} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name" onClick={onCardTitleClick}>
        <a href="#">{place.title}t</a>
      </h2>
      <p className="place-card__type">{place.type}</p>
    </div>
  </article>
);

PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
  onCardTitleClick: PropTypes.func
};

export default PlaceCard;
