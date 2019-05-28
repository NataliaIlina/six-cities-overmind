import React from "react";
import renderer from "react-test-renderer";
import {App} from "components/app/app";
import Map from "components/map/map";

it(`App rendered correctly`, () => {
  Map.prototype.componentDidMount = jest.fn();
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
