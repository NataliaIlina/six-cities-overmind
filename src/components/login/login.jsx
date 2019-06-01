import React from "react";
import Layout from "components/layout/layout";
import {connect} from "react-redux";
import {Operation} from "src/reducer";
import {Redirect} from "react-router-dom";

const Login = ({onFormSubmit, user}) =>
  user ? (
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
              onSubmit={(e) => {
                e.preventDefault();
                onFormSubmit(e.target.email.value, e.target.password.value);
              }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                />
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
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    user: state.user
  });

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit: (email, password) => {
    dispatch(dispatch(Operation.authorizeUser(email, password)));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
