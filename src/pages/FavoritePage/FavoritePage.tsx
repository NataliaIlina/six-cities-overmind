import React, { useEffect } from 'react';
import { Footer, FavoriteCard, FavoritesEmpty, Layout } from 'src/components';
import { fetchFavorite } from 'src/actions';
import { connect } from 'react-redux';
import { getFavorite } from 'reducer/data/selectors';
import { IOffer } from 'src/interfaces';
import { RootStateType } from 'src/reducer';
import { ComponentProps, FavoritePageProps } from './types';

const FavoritePage: React.FC<FavoritePageProps> = ({ favorite, fetchFavorite }) => {
  useEffect(() => {
    fetchFavorite();
  }, []);
  return (
    <Layout>
      <main className='page__main page__main--favorites'>
        {/*<div className="page__favorites-container container">
          {Object.keys(favorite).length ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.keys(favorite).map((key, index) => (
                  <li
                    className="favorites__locations-items"
                    key={`${key}_${index}`}
                  >
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{key}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favorite[key].map((it: IOffer) => (
                        <FavoriteCard offer={it} key={it.id} />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <FavoritesEmpty />
          )}
        </div>*/}
      </main>
      <Footer />
    </Layout>
  );
};

const mapStateToProps = (state: RootStateType, ownProps: ComponentProps) =>
  Object.assign({}, ownProps, {
    favorite: getFavorite(state),
  });

const mapDispatchToProps = { fetchFavorite };

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage);
