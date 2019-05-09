import React from "react";
import renderer from "react-test-renderer";
import App from "components/app/app";

const mock = [
  {
    title: `title`,
    price: 120,
    isPremium: true,
    rating: 93,
    type: `Apartment`,
    url: `img/apartment-01.jpg`
  },
  {
    title: `title`,
    price: 80,
    isPremium: false,
    rating: 80,
    type: `Private room`,
    url: `img/room.jpg`
  }
];

it(`App rendered correctly`, () => {
  const tree = renderer.create(<App offers={mock} />).toJSON();
  expect(tree).toMatchSnapshot();
});
