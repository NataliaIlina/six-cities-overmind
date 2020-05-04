import React from 'react';
import { Link } from 'src/components';
import { IUser } from 'src/interfaces';
import { BASE_URL } from 'src/constants';
import { useOvermind } from 'src/overmind';

const Header: React.FC = () => {
  const { state } = useOvermind();
  console.log(state.user);
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Link to='/' className='header__logo-link header__logo-link--active'>
              <img
                className='header__logo'
                src={`${BASE_URL}/img/logo.svg`}
                alt='6 cities logo'
                width='81'
                height='41'
              />
            </Link>
          </div>
          <nav className='header__nav'>
            <ul className='header__nav-list'>
              <li className='header__nav-item user'>
                <Link
                  className='header__nav-link header__nav-link--profile'
                  to={`/${state.user ? `favorites` : `login`}`}
                >
                  <div className='header__avatar-wrapper user__avatar-wrapper' />
                  {state.user ? (
                    <span className='header__user-name user__name'>{state.user.email}</span>
                  ) : (
                    <span className='header__login'>Sign in</span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
