import React from "react";
import renderer from "react-test-renderer";
import CitiesList from "components/cities-list/cities-list";
import {CITY_MOCK} from "src/constants";

it(`Cities list rendered correctly`, () => {
  const tree = renderer
    .create(
        <CitiesList
          currentCity={CITY_MOCK}
          onCityChange={() => {}}
          cities={[CITY_MOCK]}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
