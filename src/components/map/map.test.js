import React from "react";
import Map from "components/map/map";
import renderer from "react-test-renderer";
import {OFFER_MOCK, CITY_MOCK} from "src/constants";

it(`Map rendered correctly`, () => {
  Map.prototype.componentDidMount = jest.fn();
  const tree = renderer
    .create(<Map offers={[OFFER_MOCK]} currentCity={CITY_MOCK} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
