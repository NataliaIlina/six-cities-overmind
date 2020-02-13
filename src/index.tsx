import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { App } from "containers";
import reducer from "reducer/index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { compose } from "recompose";
import { createAPI } from "./api";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/styles.css";
import { UserState } from "reducer/user/user";
import { State } from "reducer/data/data";

const enhancers = [];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension =
    ((window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()) ||
    compose;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension);
  }
}

export interface RootState {
  USER: UserState;
  DATA: State;
}

const init = () => {
  const api = createAPI();
  const store = createStore<RootState, any, any, any>(
    reducer,
    compose(applyMiddleware(thunk.withExtraArgument(api)), ...enhancers)
  );

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(`#root`)
  );
};

init();
