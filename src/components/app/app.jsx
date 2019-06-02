import React from "react";
import MainPage from "components/main-page/main-page";
import Favorites from "components/favorites/favorites";
import {Switch, Route} from "react-router-dom";
import Login from "components/login/login";
import {Operation} from "src/reducer";
import {connect} from "react-redux";

class App extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/login" component={Login} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/offer/:id" component={MainPage} />
      </Switch>
    );
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => {
    dispatch(Operation.loadUser());
  }
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
