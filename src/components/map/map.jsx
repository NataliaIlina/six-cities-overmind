import React from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";
import { OFFER_PROP_TYPES, CITY_PROP_TYPES } from "src/constants";

class Map extends React.PureComponent {
  super() {
    this._group = null;
    this._map = null;
  }

  _initCard() {
    const { currentCity, offers } = this.props;
    const coords = [currentCity.location.latitude, currentCity.location.longitude];
    const zoom = currentCity.location.zoom;

    this._map = leaflet.map(`map`, {
      center: coords,
      zoom,
      zoomControl: false,
      marker: true,
    });

    this._map.setView(coords, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      })
      .addTo(this._map);

    this._group = leaflet.layerGroup().addTo(this._map);

    offers.forEach(offer =>
      leaflet
        .marker([offer.location.latitude, offer.location.longitude], {
          icon: leaflet.icon({
            iconUrl: `img/pin.svg`,
            iconSize: [30, 30],
          }),
          title: offer.title,
        })
        .addTo(this._group),
    );
  }

  componentDidMount() {
    this._initCard();
  }

  componentDidUpdate(prevProps) {
    const { offers, activeOffer } = this.props;
    if (prevProps.activeOffer === activeOffer) {
      return;
    }

    this._group.clearLayers();

    offers.forEach(offer =>
      leaflet
        .marker([offer.location.latitude, offer.location.longitude], {
          icon: leaflet.icon({
            iconUrl: `img/${offer.id === activeOffer ? "pin-active" : "pin"}.svg`,
            iconSize: [30, 30],
          }),
          title: offer.title,
        })
        .addTo(this._group),
    );
  }

  render() {
    return <div id="map" style={{ height: `100%` }} />;
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES),
  currentCity: CITY_PROP_TYPES,
  activeOffer: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

export default Map;
