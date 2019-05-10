import React from "react";
import PlaceCard from "components/place-card/place-card";
import PropTypes from "prop-types";

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null
    };
  }

  _setActiveCard(offer) {
    this.setState({activeCard: offer});
  }

  render() {
    const {offers} = this.props;
    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer, index) => (
          <PlaceCard
            offer={offer}
            key={`${offer.name}_${index}`}
            onCardClick={() => {
              this._setActiveCard(offer);
            }}
            onCardHover={() => {
              this._setActiveCard(offer);
            }}
          />
        ))}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        isPremium: PropTypes.bool,
        rating: PropTypes.number,
        type: PropTypes.oneOf([`Apartment`, `Private room`]).isRequired,
        url: PropTypes.string
      })
  ).isRequired
};

export default OffersList;
