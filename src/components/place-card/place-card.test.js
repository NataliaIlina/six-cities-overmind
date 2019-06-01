import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "components/place-card/place-card";
import {OFFER_MOCK} from "src/constants";

it(`PlaceCard rendered correctly`, () => {
  const tree = renderer.create(<PlaceCard offer={OFFER_MOCK} />).toJSON();
  expect(tree).toMatchSnapshot();
});
