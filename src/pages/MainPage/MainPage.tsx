import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getCurrentCity,
  getOffersForCurrentSorting
} from "reducer/data/selectors";
import { fetchOffers, setActiveOffer } from "src/actions";
import { Layout, CitiesList, OffersList, SortingSelect, Map } from "containers";
import { RootStateType } from "src/reducer";
import { ComponentProps, MainPageProps } from "./types";

const MainPage: React.FC<MainPageProps> = ({
  fetchOffers,
  offers,
  currentCity,
  setActiveOffer
}) => {
  useEffect(() => {
    fetchOffers();
    setActiveOffer(null);
  }, []);

  return (
    <Layout type="main">
      <main className="page__main page__main--index">
        {offers.length ? (
          <React.Fragment>
            <h1 className="visually-hidden">Cities</h1>
            <CitiesList />
            <div className="cities__places-wrapper">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">
                    {offers.length} places to stay in {currentCity.name}
                  </b>
                  <SortingSelect />
                  <OffersList />
                </section>

                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map offers={offers} />
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

const mapStateToProps = (state: RootStateType, ownProps: ComponentProps) =>
  Object.assign({}, ownProps, {
    currentCity: getCurrentCity(state),
    offers: getOffersForCurrentSorting(state)
  });

const mapDispatchToProps = { fetchOffers, setActiveOffer };

export { MainPage };

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
