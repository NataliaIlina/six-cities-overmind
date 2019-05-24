import React from "react";
import PropTypes from "prop-types";

const CitiesList = ({onCityChange, currentCity, cities}) => (
  <div className="cities tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={`locations__item-link tabs__item ${
                currentCity === city ? `tabs__item--active` : ``
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onCityChange(city);
              }}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

CitiesList.propTypes = {
  onCityChange: PropTypes.func.isRequired,
  currentCity: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CitiesList;
