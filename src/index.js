import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reducer from "reducer/index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { compose } from "recompose";
import { createAPI } from "./api";
import { BrowserRouter } from "react-router-dom";
import { App } from "containers";
import "./assets/styles/styles.css";

const init = () => {
  const api = createAPI();
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk.withExtraArgument(api)),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
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
