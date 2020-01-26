import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { CitiesList, OffersList, Map, SortingSelect } from "components";
import { connect } from "react-redux";
import { OFFER_PROP_TYPES, CITY_PROP_TYPES } from "src/constants";
import {
  getCitiesList,
  getCurrentCity,
  getOffersForCurrentSorting,
  getSorting,
  getActiveOffer
} from "reducer/data/selectors";
import { getUserAuth } from "reducer/user/selectors";
import {
  changeSorting,
  changeCity,
  fetchOffers,
  setActiveOffer,
  toggleFavoriteStatus
} from "src/actions";
import { Layout } from "containers";

const MainPage = ({
  loadOffers,
  offers,
  currentCity,
  cities,
  sorting,
  onSortingChange,
  setActiveOffer,
  onCityChange,
  activeOffer,
  toggleFavoriteStatus,
  isUserAuth
}) => {
  useEffect(() => {
    loadOffers();
  }, []);

  return (
    <Layout type="main">
      <main className="page__main page__main--index">
        {offers.length ? (
          <React.Fragment>
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
                  <SortingSelect
                    sorting={sorting}
                    onSortingChange={onSortingChange}
                  />
                  <OffersList
                    offers={offers}
                    setActiveOffer={setActiveOffer}
                    toggleFavoriteStatus={toggleFavoriteStatus}
                    isUserAuth={isUserAuth}
                  />
                </section>

                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map
                      offers={offers}
                      currentCity={currentCity}
                      key={currentCity.name}
                      activeOffer={activeOffer}
                    />
                  </section>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div>
            <p style={{ textAlign: `center` }}>Loading...</p>
          </div>
        )}
      </main>
    </Layout>
  );
};

MainPage.propTypes = {
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES),
  onCityChange: PropTypes.func.isRequired,
  loadOffers: PropTypes.func.isRequired,
  currentCity: CITY_PROP_TYPES,
  cities: PropTypes.arrayOf(CITY_PROP_TYPES).isRequired,
  sorting: PropTypes.string.isRequired,
  onSortingChange: PropTypes.func.isRequired,
  setActiveOffer: PropTypes.func.isRequired,
  activeOffer: PropTypes.number
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    currentCity: getCurrentCity(state),
    cities: getCitiesList(state),
    offers: getOffersForCurrentSorting(state),
    sorting: getSorting(state),
    activeOffer: getActiveOffer(state),
    isUserAuth: getUserAuth(state)
  });

const mapDispatchToProps = dispatch => ({
  onCityChange: city => {
    dispatch(changeCity(city));
  },
  loadOffers: () => {
    dispatch(fetchOffers());
  },
  onSortingChange: sortingValue => {
    dispatch(changeSorting(sortingValue));
  },
  setActiveOffer: id => {
    dispatch(setActiveOffer(id));
  },
  toggleFavoriteStatus: (hotelId, status) => {
    dispatch(toggleFavoriteStatus(hotelId, status));
  }
});

export { MainPage };

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
