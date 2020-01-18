import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const withPrivateRoute = Component => {
  const PrivateRoute = ({ isUserAuth, redirectPathname = "/", ...props }) =>
    isUserAuth ? <Component {...props} /> : <Redirect to={redirectPathname} />;

  const mapStateToProps = (state, ownProps) =>
    Object.assign({}, ownProps, {
      isUserAuth: state.isUserAuth,
    });

  return connect(mapStateToProps)(PrivateRoute);
};

export default withPrivateRoute;
