import React from 'react';
import { IOffer } from 'src/types';

interface FavoriteCardProps {
  offer: IOffer;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ offer }) => (
  <article className='favorites__card place-card'>
    <div className='favorites__image-wrapper place-card__image-wrapper'>
      <a href={`/offer/${offer.id}`}>
        <img
          className='place-card__image'
          src={offer.previewImage}
          width='150'
          height='110'
          alt='Place image'
        />
      </a>
    </div>
    <div className='favorites__card-info place-card__info'>
      <div className='place-card__price-wrapper'>
        <div className='place-card__price'>
          <b className='place-card__price-value'>&euro;{offer.price}</b>
          <span className='place-card__price-text'>&#47;&nbsp;night</span>
        </div>
        <button
          className='place-card__bookmark-button place-card__bookmark-button--active button'
          type='button'
        >
          <svg className='place-card__bookmark-icon' width='18' height='19'>
            <use xlinkHref='#icon-bookmark' />
          </svg>
          <span className='visually-hidden'>In bookmarks</span>
        </button>
      </div>
      <div className='place-card__rating rating'>
        <div className='place-card__stars rating__stars'>
          <span style={{ width: `${(offer.rating * 100) / 5}%` }} />
          <span className='visually-hidden'>Rating</span>
        </div>
      </div>
      <h2 className='place-card__name'>
        <a href={`/offer/${offer.id}`}>{offer.title}</a>
      </h2>
      <p className='place-card__type'>{offer.type}</p>
    </div>
  </article>
);

export default FavoriteCard;
