import React from "react";
import MainPage from "components/main-page/main-page";
import OfferPage from "components/offer-page/offer-page";
import Favorites from "components/favorites/favorites";
import {Switch, Route} from "react-router-dom";
import Login from "components/login/login";
import {Operation} from "src/reducer";
import {connect} from "react-redux";

class App extends React.Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.loadOffers();
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/favorites" exact component={Favorites} />
        <Route path="/offer/:id" exact component={OfferPage} />
      </Switch>
    );
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => {
    dispatch(Operation.loadUser());
  },
  loadOffers: () => {
    dispatch(Operation.loadOffers());
  }
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
