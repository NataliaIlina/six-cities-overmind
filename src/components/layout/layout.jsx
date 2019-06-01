import React from "react";
import Header from "components/header/header";
import SvgSprite from "components/svg-sprite/svg-sprite";
import PropTypes from "prop-types";

const Layout = ({children, type}) => (
  <div
    className={`page
    ${type === `login` ? `page--login page--gray` : ``}
    ${type === `main` ? `page--main page--gray` : ``}`}
  >
    <SvgSprite />
    <Header />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  type: PropTypes.string
};

export default Layout;
