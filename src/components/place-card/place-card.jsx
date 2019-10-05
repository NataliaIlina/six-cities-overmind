import React from "react";
import PropTypes from "prop-types";
import {OFFER_PROP_TYPES} from "src/constants";
import {Operation} from "src/reducer";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const PlaceCard = ({offer, onCardClick, onBookmarkClick}) => (
  <article className="cities__place-card place-card">
    {offer.isPremium && (
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
          onCardClick(offer.id);
        }}
      >
        <img
          className="place-card__image"
          src={offer.previewImage}
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
            offer.isFavorite ? `place-card__bookmark-button--active` : ``
          }`}
          type="button"
          onClick={() => {
            onBookmarkClick(offer.id, offer.isFavorite ? 0 : 1);
          }}
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
        <Link to={`/offer/${offer.id}`} onClick={() => onCardClick(offer.id)}>
          {offer.title}
        </Link>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>
);

PlaceCard.propTypes = {
  offer: OFFER_PROP_TYPES,
  onCardClick: PropTypes.func,
  onCardHover: PropTypes.func
};

export {PlaceCard};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    favorite: state.favorite,
    user: state.user
  });

const mapDispatchToProps = (dispatch) => ({
  onBookmarkClick: (hotelId, status) => {
    dispatch(Operation.toggleFavorite(hotelId, status));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaceCard);
