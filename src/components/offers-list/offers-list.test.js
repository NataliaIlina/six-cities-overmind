import React from "react";
import renderer from "react-test-renderer";
import {OffersList} from "components/offers-list/offers-list";
import {OFFER_MOCK} from "src/constants";

it(`OffersList rendered correctly`, () => {
  const tree = renderer
    .create(
        <OffersList
          offers={[OFFER_MOCK]}
          activeItem={{}}
          setActiveItem={() => {}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
