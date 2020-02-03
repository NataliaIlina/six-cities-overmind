import React, { useEffect } from "react";
import { MainPage, OfferPage, FavoritePage, LoginPage } from "pages";
import { Switch, Route } from "react-router-dom";
import { withPrivateRoute } from "hocs";
import { connect } from "react-redux";
import { fetchUser } from "src/actions";

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route
        path="/favorites"
        exact
        component={withPrivateRoute(FavoritePage)}
      />
      <Route path="/offer/:id" exact component={OfferPage} />
    </Switch>
  );
};

const mapDispatchToProps = dispatch => ({
  loadUser: () => {
    dispatch(fetchUser());
  }
});

export default connect(null, mapDispatchToProps)(App);
