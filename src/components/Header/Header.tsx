import React from 'react';
import { BASE_URL } from 'src/constants/constants';
import { useOvermind } from 'src/overmind';

const Header: React.FC = () => {
  const { state } = useOvermind();

  const { user } = state;

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <a href='/' className='header__logo-link header__logo-link--active'>
              <img
                className='header__logo'
                src={`${BASE_URL}/img/logo.svg`}
                alt='6 cities logo'
                width='81'
                height='41'
              />
            </a>
          </div>
          <nav className='header__nav'>
            <ul className='header__nav-list'>
              <li className='header__nav-item user'>
                <a
                  className='header__nav-link header__nav-link--profile'
                  href={`/${user.isUserAuth ? `favorite` : `login`}`}
                >
                  <div className='header__avatar-wrapper user__avatar-wrapper' />
                  {user.isUserAuth ? (
                    <span className='header__user-name user__name'>{user.data.email}</span>
                  ) : (
                    <span className='header__login'>Sign in</span>
                  )}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
