import React from "react";
import { Header, SvgSprite } from "components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { USER_PROP_TYPES } from "src/constants";
import { getUserData } from "reducer/user/selectors";

const Layout = ({ children, type, userData }) => (
  <div
    className={`page
    ${type === `login` ? `page--login page--gray` : ``}
    ${type === `main` ? `page--main page--gray` : ``}`}
  >
    <SvgSprite />
    <Header userData={userData} />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
  type: PropTypes.string,
  userData: USER_PROP_TYPES,
};


const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    userData: getUserData(state),
  });

export default connect(mapStateToProps)(Layout);