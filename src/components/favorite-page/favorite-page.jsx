import React from "react";
import Footer from "components/footer/footer";
import {Operation} from "reducer/data/data";
import {connect} from "react-redux";
import Layout from "components/layout/layout";
import FavoriteCard from "components/favorite-card/favorite-card";
import FavoritesEmpty from "components/favorites-empty/favorites-empty";

class FavoritePage extends React.Component {
  componentDidMount() {
    this.props.loadFavorite();
  }
  render() {
    const {favorite} = this.props;
    return (
      <Layout>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
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
                        {favorite[key].map((it) => (
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
  }
}

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    favorite: state.favorite
  });

const mapDispatchToProps = (dispatch) => ({
  loadFavorite: () => {
    dispatch(Operation.loadFavorite());
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoritePage);
