import React from "react";
import Header from "components/header/header";
import OffersList from "components/offers-list/offers-list";
import PropTypes from "prop-types";
import Map from "components/map/map";
import CitiesList from "components/cities-list/cities-list";
import {connect} from "react-redux";
import {ActionCreator} from "src/reducer";

const App = ({offers, onCityChange, city, cities}) => (
  <div>
    <div style={{display: `none`}}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <symbol id="icon-arrow-select" viewBox="0 0 7 4">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
          />
        </symbol>
        <symbol id="icon-bookmark" viewBox="0 0 17 18">
          <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" />
        </symbol>
        <symbol id="icon-star" viewBox="0 0 13 12">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
          />
        </symbol>
      </svg>
    </div>

    <Header userName="Oliver.conner@gmail.com" />

    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesList
        onCityChange={onCityChange}
        cities={cities}
        currentCity={city}
      />
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {offers.length} places to stay in {city}
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
              <Map offers={offers} city={city} key={city} />
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
);

App.propTypes = {
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
  onCityChange: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    city: state.city,
    offers: state.offers,
    cities: state.cities
  });

const mapDispatchToProps = (dispatch) => ({
  onCityChange: (city) => {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
