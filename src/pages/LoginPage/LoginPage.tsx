import React, { useState } from "react";
import { Layout } from "containers";
import { connect } from "react-redux";
import { authorizeUser } from "src/actions";
import { Redirect } from "react-router-dom";
import { getUserAuth } from "reducer/user/selectors";
import { Link } from "react-router-dom";

interface LoginPageProps {
  onFormSubmit: (email: string, password: string) => void;
  isUserAuth: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onFormSubmit, isUserAuth }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return isUserAuth ? (
    <Redirect to="/" />
  ) : (
    <Layout type="login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              autoComplete="off"
              action="#"
              method="post"
              onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
                e.preventDefault();
                onFormSubmit(email, password);
              }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required={true}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setEmail(e.target.value)
                  }
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required={true}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setPassword(e.target.value)
                  }
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
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isUserAuth: getUserAuth(state)
  });

const mapDispatchToProps = dispatch => ({
  onFormSubmit: (email: string, password: string) => {
    dispatch(authorizeUser(email, password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);