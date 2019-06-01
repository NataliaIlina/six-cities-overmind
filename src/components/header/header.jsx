import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {USER_PROP_TYPES} from "src/constants";

const Header = ({user}) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to="/" className="header__logo-link header__logo-link--active">
            <img
              className="header__logo"
              src="img/logo.svg"
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
                to={`/${user ? `favorites` : `login`}`}
              >
                <div
                  className="header__avatar-wrapper user__avatar-wrapper"
                  /*                   style={{
                    backgroundImage:
                      user && user.avatarUrl ? `url(..${user.avatarUrl})` : ``
                  }} */
                />
                {user ? (
                  <span className="header__user-name user__name">
                    {user.name}
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
  user: USER_PROP_TYPES
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    user: state.user
  });

export default connect(mapStateToProps)(Header);
