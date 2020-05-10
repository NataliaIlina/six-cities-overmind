import React from 'react';
import { BASE_URL } from 'src/constants/constants';

const Footer: React.FC = () => (
  <footer className='footer container'>
    <a className='footer__logo-link' href='/'>
      <img
        className='footer__logo'
        src={`${BASE_URL}/img/logo.svg`}
        alt='6 cities logo'
        width='64'
        height='33'
      />
    </a>
  </footer>
);

export default Footer;
