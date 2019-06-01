import React from "react";
import renderer from "react-test-renderer";
import {MainPage} from "components/main-page/main-page";
import {OFFER_MOCK, CITY_MOCK} from "src/constants";
import Map from "components/map/map";

it(`MainPage rendered correctly`, () => {
  Map.prototype.componentDidMount = jest.fn();
  const tree = renderer
    .create(
        <MainPage
          offers={[OFFER_MOCK]}
          currentCity={CITY_MOCK}
          cities={[CITY_MOCK]}
          onCityChange={() => {}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
