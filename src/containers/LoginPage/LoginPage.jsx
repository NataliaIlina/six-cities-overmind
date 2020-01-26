import React from "react";
import {Layout} from 'containers';
import { connect } from "react-redux";
import { authorizeUser } from "src/actions";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { getUserData } from "reducer/user/selectors";
import { USER_PROP_TYPES } from "src/constants";
import { Link } from "react-router-dom";

const LoginPage = ({ onFormSubmit, userData }) =>
  userData ? (
    <Redirect to="/" />
  ) : (
    <Layout type="login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={e => {
                e.preventDefault();
                onFormSubmit(e.target.email.value, e.target.password.value);
              }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required=""
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );

LoginPage.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  userData: USER_PROP_TYPES,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    userData: getUserData(state),
  });

const mapDispatchToProps = dispatch => ({
  onFormSubmit: (email, password) => {
    dispatch(authorizeUser(email, password));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
