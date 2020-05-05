import React from 'react';
import { Link } from 'src/components';
import { IOffer } from 'src/types';
import { useOvermind } from 'src/overmind';

interface PlaceCardProps {
  offer: IOffer;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ offer }) => {
  const { state, actions } = useOvermind();

  const { isUserAuth } = state;
  const { toggleFavoriteStatus, setActiveOfferId } = actions;

  return (
    <article className='cities__place-card place-card'>
      {offer.isPremium && (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      )}
      <div className='cities__image-wrapper place-card__image-wrapper'>
        <a
          className='place-card__link'
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            setActiveOfferId(offer.id);
          }}
        >
          <img
            className='place-card__image'
            src={offer.previewImage}
            width='260'
            height='200'
            alt='Place image'
          />
        </a>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          {isUserAuth ? (
            <button
              className={`place-card__bookmark-button button ${
                offer.isFavorite ? `place-card__bookmark-button--active` : ``
              }`}
              type='button'
              onClick={() => {
                toggleFavoriteStatus({ hotelId: offer.id, status: offer.isFavorite ? 0 : 1 });
              }}
            >
              <svg className='place-card__bookmark-icon' width='18' height='19'>
                <use xlinkHref='#icon-bookmark' />
              </svg>
              <span className='visually-hidden'>To bookmarks</span>
            </button>
          ) : null}
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${(offer.rating * 100) / 5}%` }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className='place-card__type'>{offer.type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
