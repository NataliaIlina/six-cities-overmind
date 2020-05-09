import React, { useEffect } from 'react';
import { Footer, FavoriteCard, FavoritesEmpty, Layout } from 'src/components';
import { IOffer } from 'src/types';
import { useOvermind } from 'src/overmind';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from 'src/constants/constants';

const FavoritePage: React.FC = () => {
  const { state, actions } = useOvermind();

  const { favorite, user } = state;
  const { fetchFavorite } = actions;

  useEffect(() => {
    fetchFavorite();
  }, []);

  if (!user.isUserAuth) {
    return <Redirect to={BASE_URL} />;
  }

  return (
    <Layout>
      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          {Object.keys(favorite)?.length ? (
            <section className='favorites'>
              <h1 className='favorites__title'>Saved listing</h1>
              <ul className='favorites__list'>
                {Object.keys(favorite).map((key, index) => (
                  <li className='favorites__locations-items' key={`${key}_${index}`}>
                    <div className='favorites__locations locations locations--current'>
                      <div className='locations__item'>
                        <a className='locations__item-link' href='#'>
                          <span>{key}</span>
                        </a>
                      </div>
                    </div>
                    <div className='favorites__places'>
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
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export default FavoritePage;
