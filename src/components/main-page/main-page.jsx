import React from "react";
import OffersList from "components/offers-list/offers-list";
import PropTypes from "prop-types";
import Map from "components/map/map";
import CitiesList from "components/cities-list/cities-list";
import {connect} from "react-redux";
import {getOffersForCurrentCity} from "src/reducer";
import {ActionCreator} from "src/reducer";
import {OFFER_PROP_TYPES, CITY_PROP_TYPES} from "src/constants";

const MainPage = ({offers, cities, currentCity, onCityChange}) =>
  offers.length ? (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesList
        cities={cities}
        currentCity={currentCity}
        onCityChange={onCityChange}
      />
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {offers.length} places to stay in {currentCity.name}
            </b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex="0">
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              {/*               <ul className="places__options places__options--custom places__options--opened">
    <li
      className="places__option places__option--active"
      tabIndex="0"
    >
      Popular
    </li>
    <li className="places__option" tabIndex="0">
      Price: low to high
    </li>
    <li className="places__option" tabIndex="0">
      Price: high to low
    </li>
    <li className="places__option" tabIndex="0">
      Top rated first
    </li>
  </ul> */}

              {/*               <select
    className="places__sorting-type"
    id="places-sorting"
    defaultValue="popular"
  >
    <option className="places__option" value="popular">
      Popular
    </option>
    <option className="places__option" value="to-high">
      Price: low to high
    </option>
    <option className="places__option" value="to-low">
      Price: high to low
    </option>
    <option className="places__option" value="top-rated">
      Top rated first
    </option>
  </select> */}
            </form>

            <OffersList offers={offers} />
          </section>

          <div className="cities__right-section">
            <section className="cities__map map">
              {currentCity ? (
                <Map
                  offers={offers}
                  currentCity={currentCity}
                  key={currentCity.name}
                />
              ) : null}
            </section>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <div>loading</div>
  );

MainPage.propTypes = {
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES),
  onCityChange: PropTypes.func.isRequired,
  currentCity: CITY_PROP_TYPES,
  cities: PropTypes.arrayOf(CITY_PROP_TYPES).isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    currentCity: state.currentCity,
    cities: state.cities,
    offers: getOffersForCurrentCity(state)
  });

const mapDispatchToProps = (dispatch) => ({
  onCityChange: (city) => {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {MainPage};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);
