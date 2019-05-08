import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "components/place-card/place-card";

it(`PlaceCard rendered correctly`, () => {
  const tree = renderer
    .create(
        <PlaceCard
          offer={{
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
