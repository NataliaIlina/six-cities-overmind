import React from "react";
import PropTypes from "prop-types";
import withActiveItem from "src/hocs/with-active-item/with-active-item";

class CitiesList extends React.PureComponent {
  componentDidMount() {
    this.props.setActiveItem(this.props.currentCity);
  }

  render() {
    const {cities, activeItem, setActiveItem, onCityChange} = this.props;

    return (
      <div className="cities tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => (
              <li className="locations__item" key={city}>
                <a
                  className={`locations__item-link tabs__item ${
                    activeItem === city ? `tabs__item--active` : ``
                  }`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem(city);
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
  }
}

CitiesList.propTypes = {
  onCityChange: PropTypes.func.isRequired,
  currentCity: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeItem: PropTypes.any,
  setActiveItem: PropTypes.func.isRequired
};

export default withActiveItem(CitiesList);
