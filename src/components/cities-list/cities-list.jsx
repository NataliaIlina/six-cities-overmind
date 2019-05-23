import React from "react";
import {offers} from "src/mocks/offers";
import PropTypes from "prop-types";

const CitiesList = ({onCityChange, currentCity}) => (
  <div className="cities tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.keys(offers).map((city) => (
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
  currentCity: PropTypes.string.isRequired
};

export default CitiesList;
