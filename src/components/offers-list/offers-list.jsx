import React from "react";
import PlaceCard from "components/place-card/place-card";
import PropTypes from "prop-types";
import withActiveItem from "src/hocs/with-active-item/with-active-item";
import {OFFER_PROP_TYPES} from "src/constants";

const OffersList = ({offers, setActiveItem, activeItem}) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer, index) => (
      <PlaceCard
        offer={offer}
        activeOffer={activeItem}
        key={`${offer.name}_${index}`}
        onCardClick={setActiveItem}
        onCardHover={setActiveItem}
      />
    ))}
  </div>
);

OffersList.propTypes = {
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES),
  activeItem: PropTypes.any,
  setActiveItem: PropTypes.func.isRequired
};

export {OffersList};

export default withActiveItem(OffersList);
