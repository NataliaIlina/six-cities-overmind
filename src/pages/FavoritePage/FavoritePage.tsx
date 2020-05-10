import React from 'react';
import { Footer, FavoriteCard, FavoritesEmpty, Layout } from 'src/components';
import { IOffer } from 'src/types';
import { useOvermind } from 'src/overmind';
import page from 'page';

const FavoritePage: React.FC = () => {
  const { state } = useOvermind();

  const { favorite, user, isLoading } = state;

  if (!user.isUserAuth) {
    page.redirect('/');
  }

  return (
    <Layout>
      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          {isLoading && <div>Loading...</div>}
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
