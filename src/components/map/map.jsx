import React from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";
import {OFFER_PROP_TYPES, CITY_PROP_TYPES} from "src/constants";

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

  componentDidMount() {
    this._initCard();
  }

  render() {
    return <div id="map" style={{height: `100%`}} />;
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES),
  currentCity: CITY_PROP_TYPES
};

export default Map;
