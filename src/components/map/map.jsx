import React from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

class Map extends React.Component {
  _initCard() {
    const city = [52.38333, 4.9];
    const zoom = 12;
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });

    map.setView(city, zoom);

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
  ).isRequired
};

export default Map;
