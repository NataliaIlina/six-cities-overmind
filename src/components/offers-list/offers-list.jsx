import React from "react";
import PlaceCard from "components/place-card/place-card";
import PropTypes from "prop-types";
import withActiveItem from "src/hocs/with-active-item/with-active-item";

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
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        isPremium: PropTypes.bool,
        rating: PropTypes.number,
        type: PropTypes.oneOf([`Apartment`, `Private room`]).isRequired,
        url: PropTypes.string,
        coords: PropTypes.arrayOf(PropTypes.number)
      })
  ).isRequired,
  activeItem: PropTypes.any,
  setActiveItem: PropTypes.func.isRequired
};

export default withActiveItem(OffersList);
