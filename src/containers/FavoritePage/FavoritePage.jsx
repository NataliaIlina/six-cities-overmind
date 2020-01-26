import React, { useEffect } from "react";
import { Footer, FavoriteCard, FavoritesEmpty } from "components";
import {Layout} from 'containers';
import { fetchFavorite } from "src/actions";
import { connect } from "react-redux";
import { getFavorite } from "reducer/data/selectors";

const FavoritePage = ({ favorite, loadFavorite }) => {
  useEffect(() => {
    loadFavorite();
  }, []);
  return (
    <Layout>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {Object.keys(favorite).length ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.keys(favorite).map((key, index) => (
                  <li className="favorites__locations-items" key={`${key}_${index}`}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{key}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favorite[key].map(it => (
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
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    favorite: getFavorite(state),
  });

const mapDispatchToProps = dispatch => ({
  loadFavorite: () => {
    dispatch(fetchFavorite());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavoritePage);
