import React from "react";
import { MainPage, OfferPage, FavoritePage, LoginPage } from "containers";
import { Switch, Route } from "react-router-dom";
import { withUserAuth, withPrivateRoute } from "hocs";

const App = () => (
  <Switch>
    <Route path="/" exact component={MainPage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/favorites" exact component={withPrivateRoute(FavoritePage)} />
    <Route path="/offer/:id" exact component={OfferPage} />
  </Switch>
);

export default withUserAuth(App);
