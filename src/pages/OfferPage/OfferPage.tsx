import React from 'react';
import { Reviews, ReviewForm, PlaceCard, Layout, Map } from 'src/components';
import { BASE_URL } from 'src/constants/constants';
import { useOvermind } from 'src/overmind';

const OfferPage: React.FC = () => {
  const { actions, state } = useOvermind();

  const { toggleFavoriteStatus } = actions;
  const { user, activeOffer, activeOfferId, nearbyOffers, isLoading } = state;

  return (
    <Layout>
      {isLoading && <div>Loading...</div>}
      {!!activeOffer && (
        <main className='page__main page__main--property'>
          <section className='property'>
            <div className='property__gallery-container container'>
              <div className='property__gallery'>
                {activeOffer.images.map((img, index) =>
                  index > 5 ? null : (
                    <div key={img} className='property__image-wrapper'>
                      <img className='property__image' src={img} alt='Photo studio' />
                    </div>
                  )
                )}
              </div>
            </div>
            <div className='property__container container'>
              <div className='property__wrapper'>
                {activeOffer.isPremium ? (
                  <div className='property__mark'>
                    <span>Premium</span>
                  </div>
                ) : null}
                <div className='property__name-wrapper'>
                  <h1 className='property__name'>{activeOffer.title}</h1>
                  {user.isUserAuth ? (
                    <button
                      className={`property__bookmark-button button ${
                        activeOffer.isFavorite ? `property__bookmark-button--active` : ``
                      }`}
                      type='button'
                      onClick={() => {
                        toggleFavoriteStatus({
                          hotelId: activeOffer.id,
                          status: activeOffer.isFavorite ? 0 : 1,
                        });
                      }}
                    >
                      <svg className='property__bookmark-icon' width='31' height='33'>
                        <use xlinkHref='#icon-bookmark' />
                      </svg>
                      <span className='visually-hidden'>To bookmarks</span>
                    </button>
                  ) : null}
                </div>
                <div className='property__rating rating'>
                  <div className='property__stars rating__stars'>
                    <span style={{ width: `${(activeOffer.rating * 100) / 5}%` }} />
                    <span className='visually-hidden'>Rating</span>
                  </div>
                  <span className='property__rating-value rating__value'>{activeOffer.rating}</span>
                </div>
                <ul className='property__features'>
                  <li className='property__feature property__feature--entire'>
                    {activeOffer.type}
                  </li>
                  <li className='property__feature property__feature--bedrooms'>
                    {activeOffer.bedrooms} Bedrooms
                  </li>
                  <li className='property__feature property__feature--adults'>
                    Max {activeOffer.maxAdults} adults
                  </li>
                </ul>
                <div className='property__price'>
                  <b className='property__price-value'>&euro;{activeOffer.price}</b>
                  <span className='property__price-text'>&nbsp;night</span>
                </div>
                <div className='property__inside'>
                  <h2 className='property__inside-title'>What&apos;s inside</h2>
                  <ul className='property__inside-list'>
                    {activeOffer.goods.map((good, index) => (
                      <li key={`${good}_${index}`} className='property__inside-item'>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='property__host'>
                  <h2 className='property__host-title'>Meet the host</h2>
                  <div className='property__host-user user'>
                    <div
                      className={`property__avatar-wrapper ${
                        activeOffer.host.isPro ? `property__avatar-wrapper--pro` : ``
                      } user__avatar-wrapper`}
                    >
                      <img
                        className='property__avatar user__avatar'
                        src={`${BASE_URL}/${activeOffer.host.avatarUrl}`}
                        width='74'
                        height='74'
                        alt='Host avatar'
                      />
                    </div>
                    <span className='property__user-name'>{activeOffer.host.name}</span>
                    {activeOffer.host.isPro ? (
                      <span className='property__user-status'>Pro</span>
                    ) : null}
                  </div>
                  <div className='property__description'>
                    <p className='property__text'>{activeOffer.description}</p>
                  </div>
                </div>
                <section className='property__reviews reviews'>
                  <Reviews />
                  {user.isUserAuth ? <ReviewForm /> : null}
                </section>
              </div>
            </div>
            <section className='property__map map'>
              <Map offers={nearbyOffers} />
            </section>
          </section>

          <div className='container'>
            <section className='near-places places'>
              <h2 className='near-places__title'>Other places in the neighbourhood</h2>
              <div className='near-places__list places__list'>
                {nearbyOffers
                  .filter((item) => item.id !== activeOfferId)
                  .map((offer) => (
                    <PlaceCard key={offer.id} offer={offer} />
                  ))}
              </div>
            </section>
          </div>
        </main>
      )}
    </Layout>
  );
};

export default OfferPage;
