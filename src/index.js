import React from "react";
import ReactDOM from "react-dom";
import App from "components/app/app";
import {createStore, applyMiddleware} from "redux";
import {reducer} from "./reducer";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from "./api";
import {BrowserRouter} from "react-router-dom";

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
