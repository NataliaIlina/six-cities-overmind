import React from "react";
import { Link } from "components";
import { BASE_URL } from "src/constants";

const Footer: React.FC = () => (
  <footer className="footer container">
    <Link className="footer__logo-link" to="/">
      <img
        className="footer__logo"
        src={`${BASE_URL}/img/logo.svg`}
        alt="6 cities logo"
        width="64"
        height="33"
      />
    </Link>
  </footer>
);

export default Footer;
