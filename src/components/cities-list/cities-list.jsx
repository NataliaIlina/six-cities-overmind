import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "src/reducer";

const CitiesList = ({cities, currentCity, onCityChange}) => (
  <div className="cities tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city, index) => (
          <li className="locations__item" key={`${city.name}_${index}`}>
            <a
              className={`locations__item-link tabs__item ${
                currentCity.name === city.name ? `tabs__item--active` : ``
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onCityChange(city);
              }}
            >
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

CitiesList.propTypes = {
  onCityChange: PropTypes.func.isRequired,
  currentCity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      zoom: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  cities: PropTypes.arrayOf(PropTypes.object).isRequired
};

export {CitiesList};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    currentCity: state.currentCity,
    cities: state.cities
  });

const mapDispatchToProps = (dispatch) => ({
  onCityChange: (city) => {
    dispatch(ActionCreator.changeCity(city));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CitiesList);
