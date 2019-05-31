import React from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

class Map extends React.PureComponent {
  _initCard() {
    const {currentCity, offers} = this.props;
    const coords = [
      currentCity.location.latitude,
      currentCity.location.longitude
    ];
    const zoom = currentCity.location.zoom;

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

    offers.forEach((offer) => {
      const offerCoords = [offer.location.latitude, offer.location.longitude];
      leaflet.marker(offerCoords, {icon, title: offer.title}).addTo(map);
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
        type: PropTypes.string.isRequired,
        url: PropTypes.string,
        coords: PropTypes.arrayOf(PropTypes.number)
      })
  ).isRequired,
  currentCity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      zoom: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default Map;
