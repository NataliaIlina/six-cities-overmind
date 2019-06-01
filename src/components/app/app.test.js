import React from "react";
import renderer from "react-test-renderer";
import App from "components/app/app";
import Map from "components/map/map";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const initialState = {
  currentCity: {},
  offers: [],
  cities: []
};
const store = mockStore(initialState);

it(`App rendered correctly`, () => {
  Map.prototype.componentDidMount = jest.fn();
  const tree = renderer
    .create(
        <Provider store={store}>
          <App />
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
