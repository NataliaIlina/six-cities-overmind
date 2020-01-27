import React from "react";
import { Link } from "react-router-dom";
import { USER_PROP_TYPES } from "src/constants";
import { IUser } from "src/interfaces";

interface HeaderProps {
  userData: IUser | null;
}

const Header: React.FC<HeaderProps> = ({ userData }) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to="/" className="header__logo-link header__logo-link--active">
            <img
              className="header__logo"
              src="/img/logo.svg"
              alt="6 cities logo"
              width="81"
              height="41"
            />
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to={`/${userData ? `favorites` : `login`}`}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper" />
                {userData ? (
                  <span className="header__user-name user__name">
                    {userData.email}
                  </span>
                ) : (
                  <span className="header__login">Sign in</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  userData: USER_PROP_TYPES
};

export default Header;
