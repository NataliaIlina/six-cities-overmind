import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'src/components';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/styles.css';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import { config } from './overmind';

const overmind = createOvermind(config, {
  devtools: 'localhost:3030',
});

const init = () => {
  ReactDOM.render(
    <Provider value={overmind}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(`#root`)
  );
};

init();
