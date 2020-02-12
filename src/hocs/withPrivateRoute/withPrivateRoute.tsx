import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserAuth } from "reducer/user/selectors";

interface PrivateRouteComponentProps {
  isUserAuth: boolean;
  redirectPathname: string;
}

const withPrivateRoute = (Component: React.FC) => {
  const PrivateRouteComponent: React.FC<PrivateRouteComponentProps> = ({
    isUserAuth,
    redirectPathname = "/",
    ...props
  }) =>
    isUserAuth ? <Component {...props} /> : <Redirect to={redirectPathname} />;

  const mapStateToProps = (state, ownProps) =>
    Object.assign({}, ownProps, {
      isUserAuth: getUserAuth(state)
    });

  return connect(mapStateToProps)(PrivateRouteComponent);
};

export default withPrivateRoute;
