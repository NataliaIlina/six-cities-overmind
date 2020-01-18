import React from "react";
import { PlaceCard } from "components";
import PropTypes from "prop-types";
import withActiveOffer from "src/hocs/with-active-item/with-active-item";
import { OFFER_PROP_TYPES } from "src/constants";

const OffersList = ({ offers, setActiveOffer, activeOffer }) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer, index) => (
      <PlaceCard offer={offer} activeOffer={activeOffer} key={`${offer.name}_${index}`} onCardClick={setActiveOffer} />
    ))}
  </div>
);

OffersList.propTypes = {
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES),
  activeOffer: PropTypes.any,
  setActiveOffer: PropTypes.func.isRequired,
};

export { OffersList };

export default withActiveOffer(OffersList);
