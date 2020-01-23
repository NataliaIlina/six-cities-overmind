import React, { useEffect } from "react";
import { Operation } from "reducer/user/user";
import { connect } from "react-redux";

const withUserAuth = Component => {
  const WithUserAuthComponent = ({ loadUser, ...props }) => {
    useEffect(() => {
      loadUser();
    }, []);
    return <Component {...props} />;
  };

  const mapDispatchToProps = dispatch => ({
    loadUser: () => {
      dispatch(Operation.loadUser());
    },
  });

  return connect(
    null,
    mapDispatchToProps,
  )(WithUserAuthComponent);
};

export default withUserAuth;
