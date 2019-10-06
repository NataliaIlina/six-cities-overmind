import React from "react";
import MainPage from "components/main-page/main-page";
import OfferPage from "components/offer-page/offer-page";
import FavoritePage from "components/favorite-page/favorite-page";
import {Switch, Route} from "react-router-dom";
import LoginPage from "components/login-page/login-page";
import {Operation} from "reducer/user/user";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import withPrivateRoute from "hocs/with-private-route/with-private-route";

const FavoritePageComponent = withPrivateRoute(FavoritePage);

class App extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/favorites" exact component={FavoritePageComponent} />
        <Route path="/offer/:id" exact component={OfferPage} />
      </Switch>
    );
  }
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => {
    dispatch(Operation.loadUser());
  }
});

export {App};

export default connect(
    null,
    mapDispatchToProps
)(App);
