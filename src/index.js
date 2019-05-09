import React from "react";
import ReactDOM from "react-dom";
import App from "components/app/app";
import {offers} from "src/mocks/offers";

const init = () => {
  ReactDOM.render(<App offers={offers} />, document.querySelector(`#root`));
};

init();
