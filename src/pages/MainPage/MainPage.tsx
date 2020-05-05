import React from 'react';
import { useOvermind } from 'src/overmind';
import { Layout, CitiesList, SortingSelect, OffersList, Map } from '../../components';

const MainPage: React.FC = () => {
  const { state } = useOvermind();

  const { currentOffers, currentOffersCount, currentCity, isLoading } = state;

  return (
    <Layout type='main'>
      <main className='page__main page__main--index'>
        {!isLoading ? (
          <React.Fragment>
            <h1 className='visually-hidden'>Cities</h1>
            <CitiesList />
            <div className='cities__places-wrapper'>
              <div className='cities__places-container container'>
                <section className='cities__places places'>
                  <h2 className='visually-hidden'>Places</h2>
                  <b className='places__found'>
                    {currentOffersCount} places to stay in {currentCity?.name}
                  </b>
                  <SortingSelect />
                  <OffersList />
                </section>

                <div className='cities__right-section'>
                  <section className='cities__map map'>
                    <Map offers={currentOffers} />
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

export default MainPage;
