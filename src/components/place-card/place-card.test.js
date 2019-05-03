import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card";

it(`PlaceCard rendered correctly`, () => {
  const tree = renderer
    .create(
        <PlaceCard
          place={{
            title: `title`,
            price: 120,
            isPremium: true,
            rating: 93,
            type: `Apartment`,
            url: `img/apartment-01.jpg`
          }}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
