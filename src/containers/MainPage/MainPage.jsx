import React from "react";
import PropTypes from "prop-types";
import { CitiesList, OffersList, Map, Layout, SortingSelect } from "components";
import { connect } from "react-redux";
import { ActionCreator, Operation } from "reducer/data/data";
import { OFFER_PROP_TYPES, CITY_PROP_TYPES } from "src/constants";
import { getCitiesList, getCurrentCity, getOffersForCurrentSorting, getSorting } from "reducer/data/selectors";

class MainPage extends React.PureComponent {
  componentDidMount() {
    this.props.loadOffers();
  }

  render() {
    const { offers, cities, currentCity, onCityChange, sorting, onSortingChange } = this.props;
    return (
      <Layout type="main">
        <main className="page__main page__main--index">
          {offers.length ? (
            <React.Fragment>
              <h1 className="visually-hidden">Cities</h1>
              <CitiesList cities={cities} currentCity={currentCity} onCityChange={onCityChange} />
              <div className="cities__places-wrapper">
                <div className="cities__places-container container">
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">
                      {offers.length} places to stay in {currentCity.name}
                    </b>
                    <SortingSelect sorting={sorting} onSortingChange={onSortingChange} />
                    <OffersList offers={offers} />
                  </section>

                  <div className="cities__right-section">
                    <section className="cities__map map">
                      <Map offers={offers} currentCity={currentCity} key={currentCity.name} />
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
  }
}

MainPage.propTypes = {
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES),
  onCityChange: PropTypes.func.isRequired,
  loadOffers: PropTypes.func.isRequired,
  currentCity: CITY_PROP_TYPES,
  cities: PropTypes.arrayOf(CITY_PROP_TYPES).isRequired,
  sorting: PropTypes.string.isRequired,
  onSortingChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    currentCity: getCurrentCity(state),
    cities: getCitiesList(state),
    offers: getOffersForCurrentSorting(state),
    sorting: getSorting(state),
  });

const mapDispatchToProps = dispatch => ({
  onCityChange: city => {
    dispatch(ActionCreator.changeCity(city));
  },
  loadOffers: () => {
    dispatch(Operation.loadOffers());
  },
  onSortingChange: sortingValue => {
    dispatch(ActionCreator.changeSorting(sortingValue));
  },
});

export { MainPage };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage);
