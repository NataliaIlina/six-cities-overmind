import React, { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Link, Layout } from 'src/components';
import { BASE_URL } from 'src/constants/constants';
import { useOvermind } from 'src/overmind';

const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  const { actions, state } = useOvermind();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (state.user.isUserAuth) {
    return <Redirect to={BASE_URL} />;
  }

  return (
    <Layout type='login'>
      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <form
              className='login__form form'
              autoComplete='off'
              action='#'
              method='post'
              onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
                e.preventDefault();
                actions.user.authorizeUser({ email, password }).then(() => history.push('/'));
              }}
            >
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>E-mail</label>
                <input
                  className='login__input form__input'
                  type='email'
                  name='email'
                  placeholder='Email'
                  required={true}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setEmail(e.target.value)
                  }
                />
              </div>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>Password</label>
                <input
                  className='login__input form__input'
                  type='password'
                  name='password'
                  placeholder='Password'
                  required={true}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setPassword(e.target.value)
                  }
                />
              </div>
              <button className='login__submit form__submit button' type='submit'>
                Sign in
              </button>
            </form>
          </section>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <Link className='locations__item-link' to='/'>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default LoginPage;
