import React from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

const COORDS = {
  Paris: [48.8534, 2.3488],
  Cologne: [50.9333, 6.95],
  Bruccels: [50.8504, 4.34878],
  Amsterdam: [52.38333, 4.9],
  Hamburg: [53.5753, 10.0153],
  Dusseldorf: [51.2217, 6.77616]
};

class Map extends React.PureComponent {
  _initCard() {
    const coords = COORDS[this.props.city];
    const zoom = 12;
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const map = leaflet.map(`map`, {
      center: coords,
      zoom,
      zoomControl: false,
      marker: true
    });

    map.setView(coords, zoom);

    leaflet
      .tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
          {
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
          }
      )
      .addTo(map);

    this.props.offers.forEach((offer) => {
      leaflet.marker(offer.coords, {icon, title: offer.title}).addTo(map);
    });
  }

  _addPinsOnCard() {}
  componentDidMount() {
    this._initCard();
  }

  render() {
    return <div id="map" style={{height: `100%`}} />;
  }
}

Map.propTypes = {
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
  city: PropTypes.string.isRequired
};

export default Map;
