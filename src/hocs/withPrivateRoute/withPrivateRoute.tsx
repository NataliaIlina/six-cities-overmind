import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserAuth } from "reducer/user/selectors";
import { BASE_URL } from "src/constants";

interface PrivateRouteComponentProps {
  isUserAuth: boolean;
  redirectPathname: string;
}

const withPrivateRoute = (Component: React.FC) => {
  const PrivateRouteComponent: React.FC<PrivateRouteComponentProps> = ({
    isUserAuth,
    redirectPathname = BASE_URL,
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
