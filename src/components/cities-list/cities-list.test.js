import React from "react";
import renderer from "react-test-renderer";
import CitiesList from "components/cities-list/cities-list";

it(`Cities list rendered correctly`, () => {
  const tree = renderer
    .create(
        <CitiesList
          currentCity="Paris"
          onCityChange={() => {}}
          cities={[`Paris`, `Amsterdam`]}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
