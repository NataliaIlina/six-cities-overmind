import React from "react";
import { PlaceCard } from "components";
import PropTypes from "prop-types";
import { OFFER_PROP_TYPES } from "src/constants";

const OffersList = ({
  offers,
  setActiveOffer,
  toggleFavoriteStatus,
  isUserAuth
}) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer, index) => (
      <PlaceCard
        offer={offer}
        key={`${offer.name}_${index}`}
        setActiveOffer={setActiveOffer}
        toggleFavoriteStatus={toggleFavoriteStatus}
        isUserAuth={isUserAuth}
      />
    ))}
  </div>
);

OffersList.propTypes = {
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES),
  setActiveOffer: PropTypes.func.isRequired,
  toggleFavoriteStatus: PropTypes.func.isRequired,
  isUserAuth: PropTypes.bool.isRequired
};

export { OffersList };

export default OffersList;
