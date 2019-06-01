import React from "react";
import MainPage from "components/main-page/main-page";
import Favorites from "components/favorites/favorites";
import {Switch, Route} from "react-router-dom";
import Login from "components/login/login";

const App = () => (
  <Switch>
    <Route path="/" exact component={MainPage} />
    <Route path="/login" component={Login} />
    <Route path="/favorites" component={Favorites} />
    <Route path="/offer/:id" component={MainPage} />
  </Switch>
);

export default App;
