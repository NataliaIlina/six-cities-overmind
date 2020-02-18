import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getCurrentOfferById,
  getComments,
  getCurrentCity,
  getOffersByCount,
  getCurrentOffer
} from "reducer/data/selectors";
import { getUserAuth } from "reducer/user/selectors";
import { Redirect } from "react-router-dom";
import { Reviews, ReviewForm, PlaceCard } from "components";
import {
  addComment,
  fetchComments,
  toggleFavoriteStatus,
  setActiveOffer
} from "src/actions";
import { Layout, Map } from "containers";
import { IOffer, IComment } from "src/interfaces";
import { RouteComponentProps } from "react-router-dom";
import { BASE_URL } from "src/constants";

interface OfferPageProps {
  fetchComments: (id: number) => void;
  addComment: (id: number, rating: number, comment: string) => void;
  toggleFavoriteStatus: (id: number, status: number) => void;
  setActiveOffer: (id: number) => void;
  offers: IOffer[];
  offer: IOffer;
  comments: IComment[];
  isUserAuth: boolean;
  currentOfferId: number;
}

const OfferPage: React.FC<OfferPageProps &
  RouteComponentProps<{ id?: string }>> = ({
  fetchComments,
  offer,
  comments,
  addComment,
  offers,
  currentOfferId,
  isUserAuth,
  toggleFavoriteStatus,
  setActiveOffer,
  match
}) => {
  useEffect(() => {
    fetchComments(parseInt(match.params.id, 10));
    setActiveOffer(parseInt(match.params.id, 10));
  }, []);

  return offer ? (
    <Layout>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map((img, index) =>
                index > 5 ? null : (
                  <div key={img} className="property__image-wrapper">
                    <img
                      className="property__image"
                      src={img}
                      alt="Photo studio"
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium ? (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              ) : null}
              <div className="property__name-wrapper">
                <h1 className="property__name">{offer.title}</h1>
                {isUserAuth ? (
                  <button
                    className={`property__bookmark-button button ${
                      offer.isFavorite
                        ? `property__bookmark-button--active`
                        : ``
                    }`}
                    type="button"
                    onClick={() => {
                      toggleFavoriteStatus(offer.id, offer.isFavorite ? 0 : 1);
                    }}
                  >
                    <svg
                      className="property__bookmark-icon"
                      width="31"
                      height="33"
                    >
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                ) : null}
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${(offer.rating * 100) / 5}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((good, index) => (
                    <li
                      key={`${good}_${index}`}
                      className="property__inside-item"
                    >
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={`property__avatar-wrapper ${
                      offer.host.isPro ? `property__avatar-wrapper--pro` : ``
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="property__avatar user__avatar"
                      src={`${BASE_URL}/${offer.host.avatarUrl}`}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{offer.host.name}</span>
                  {offer.host.isPro ? (
                    <span className="property__user-status">Pro</span>
                  ) : null}
                </div>
                <div className="property__description">
                  <p className="property__text">{offer.description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <Reviews comments={comments} />
                {isUserAuth ? (
                  <ReviewForm addComment={addComment} hotelId={offer.id} />
                ) : null}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map offers={offers} />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {offers
                .filter(item => item.id !== currentOfferId)
                .map(offer => (
                  <PlaceCard
                    key={offer.id}
                    offer={offer}
                    toggleFavoriteStatus={toggleFavoriteStatus}
                    isUserAuth={isUserAuth}
                    setActiveOffer={setActiveOffer}
                  />
                ))}
            </div>
          </section>
        </div>
      </main>
    </Layout>
  ) : (
    <Redirect to={BASE_URL} />
  );
};

export { OfferPage };

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    offer: getCurrentOfferById(state, ownProps),
    comments: getComments(state),
    offers: getOffersByCount(state, ownProps),
    currentCity: getCurrentCity(state),
    currentOfferId: getCurrentOffer(state, ownProps),
    isUserAuth: getUserAuth(state)
  });

const mapDispatchToProps = dispatch => ({
  fetchComments: (id: number) => {
    dispatch(fetchComments(id));
  },
  addComment: (id: number, rating: number, comment: string) => {
    dispatch(addComment(id, rating, comment));
  },
  toggleFavoriteStatus: (id: number, status: number) => {
    dispatch(toggleFavoriteStatus(id, status));
  },
  setActiveOffer: (id: number) => {
    dispatch(setActiveOffer(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
